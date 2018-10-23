require 'rubygems'
require 'sinatra'
require 'data_mapper'
require 'json'
require 'slim'
require 'digest/md5'

DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/amazeinn.db")
class User
  include DataMapper::Resource
  property :userid,           Serial
  property :username,         String, :required => true
  property :password,         String, :length => 32
  property :signdate,         DateTime
  property :houseflr,         Integer
  property :housenum,         Integer
  property :nickname,         String
  property :gender,           String, :default  => "Other"
  property :intro,            Text
  property :avatar,           String
  property :bgmusic,          String
  property :bgimg,            String
  property :isreal,           Boolean, :default  => false
  property :currentflr,       Integer
end
class Relation
  include DataMapper::Resource
  property :relationid,       Serial
  property :setuper,          String
  property :setuperid,        Integer
  property :receiver,         String
  property :receiverid,       Integer
  property :builddate,        DateTime
end
class State
  include DataMapper::Resource
  property :stateid,          Serial
  property :userid,           Integer
  property :content,          Text
  property :statedate,        DateTime
end
class Room
  include DataMapper::Resource
  property :roomid,           Serial
  property :houseflr,         Integer
  property :housenum,         Integer
  property :isempty,          Boolean, :default  => true
end
DataMapper.finalize

use Rack::Session::Pool, :expire_after => 3600

get '/' do
  if session[:value].nil?
    slim :index
  else
    @currentuser = User.get(session[:value])
    @liststates = Array.new(7, '')
    @statesdate = Array.new(7, '')
    @iids = Array.new(5, 0)
    @inames = Array.new(5, '')
    @isexs = Array.new(5, '')
    @ifavs = Array.new(5, '0.png')
    @istrs = Array.new(5, '')
    @iid2s = Array.new(5, 0)
    @iname2s = Array.new(5, '')
    @isex2s = Array.new(5, '')
    @ifav2s = Array.new(5, '0.png')
    @istr2s = Array.new(5, '')
    @yids = Array.new(5, 0)
    @ynames = Array.new(5, '')
    @ysexs = Array.new(5, '')
    @fyavs = Array.new(5, '0.png')
    @ystrs = Array.new(5, '')
    @ymarks = Array.new(5, 2)
    @yid2s = Array.new(5, 0)
    @yname2s = Array.new(5, '')
    @ysex2s = Array.new(5, '')
    @fyav2s = Array.new(5, '0.png')
    @ystr2s = Array.new(5, '')
    @ymark2s = Array.new(5, 2)
    @rooms = Array.new(7)
    @roomids = Array.new(7)
    @nicknames = Array.new(7, 'No nickname!')
    @intros = Array.new(7, 'No introduction!')
    @marks = Array.new(7)
    @roomstates = Array.new(7)
    @userstates = State.all(:userid => @currentuser.userid, :limit => 7,  :order => [ :stateid.desc ])
    @snum = @userstates.count
    @usta = State.last(:userid => @currentuser.userid)
    if @usta.nil? == false
      @userstates.each_with_index do |userstate, i|
        @statesdate[i] = DateTime.parse(userstate.statedate.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s + " : "
        @liststates[i] = userstate.content
      end
    end
    if @usta.nil?
      @roomstates[0] = "No status!"
      @recentstate = @roomstates[0]
    else
      @roomstates[0] = @usta.content
      @recentstate = DateTime.parse(@usta.statedate.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s + " : " + @roomstates[0]
    end
    @rooms[0] = @currentuser
    if @rooms[0].nickname.nil? == false
      @nicknames[0] = @rooms[0].nickname
    end
    if @rooms[0].intro.nil? == false
      @intros[0] = @rooms[0].intro
    end
    @marks[0] = 2
    @iifollows = Relation.all(:setuperid => @currentuser.userid)
    @ifnum = @iifollows.count
    @ifollows = @iifollows.all(:limit => 5,  :order => [ :builddate.desc ])
    @ifollow2s = @iifollows.all(:limit => 10,  :order => [ :builddate.desc ]) - @ifollows
    @ifollows.each_with_index do |ifollow, i|
      @iuser = User.get(ifollow.receiverid)
      @iids[i] = @iuser.userid
      @inames[i] = @iuser.username
      @isexs[i] = @iuser.gender
      @ifavs[i] = @iuser.avatar || "images/" + @iuser.gender + ".png"
      @istrs[i] = @iuser.username + " / F" + @iuser.houseflr.to_s + "#" + @iuser.housenum.to_s + " / "
    end
    @ifollow2s.each_with_index do |ifollow2, i|
      @iuser = User.get(ifollow2.receiverid)
      @iid2s[i] = @iuser.userid
      @iname2s[i] = @iuser.username
      @isex2s[i] = @iuser.gender
      @ifav2s[i] = @iuser.avatar || "images/" + @iuser.gender + ".png"
      @istr2s[i] = @iuser.username + " / F" + @iuser.houseflr.to_s + "#" + @iuser.housenum.to_s + " / "
    end
    @followyys = Relation.all(:receiverid => @currentuser.userid)
    @fynum = @followyys.count
    @followys = @followyys.all(:limit => 5,  :order => [ :builddate.desc ])
    @followy2s = @followyys.all(:limit => 10,  :order => [ :builddate.desc ]) - @followys
    @followys.each_with_index do |followy, i|
      @yuser = User.get(followy.setuperid)
      @iyou = Relation.all(:setuperid => @currentuser.userid, :receiverid => @yuser.userid)
      if @iyou.nil?
        @ymarks[i] = 1
      else
        @ymarks[i] = 0
      end
      @yids[i] = @yuser.userid
      @ynames[i] = @yuser.username
      @ysexs[i] = @yuser.gender
      @fyavs[i] = @yuser.avatar || "images/" + @yuser.gender + ".png"
      @ystrs[i] = @yuser.username + " / F" + @yuser.houseflr.to_s + "#" + @yuser.housenum.to_s + " / "
    end
    @followy2s.each_with_index do |followy2, i|
      @yuser = User.get(followy2.setuperid)
      @iyou = Relation.all(:setuperid => @currentuser.userid, :receiverid => @yuser.userid)
      if @iyou.nil?
        @ymark2s[i] = 1
      else
        @ymark2s[i] = 0
      end
      @yid2s[i] = @yuser.userid
      @yname2s[i] = @yuser.username
      @ysex2s[i] = @yuser.gender
      @fyav2s[i] = @yuser.avatar || "images/" + @yuser.gender + ".png"
      @ystr2s[i] = @yuser.username + " / F" + @yuser.houseflr.to_s + "#" + @yuser.housenum.to_s + " / "
    end
    for i in 1..6 do
      @rooms[i] = User.last(:houseflr => @currentuser.currentflr, :housenum => i)
      if @rooms[i].nil? == false
        @sta = State.last(:userid => @rooms[i].userid)
      else
        @sta = nil
      end
      if @sta.nil?
        @roomstates[i] = "No status!"
      else
        @roomstates[i] = @sta.content
      end
      if @rooms[i].nil? == false
        @rela = Relation.last(:setuperid => @currentuser.userid, :receiverid => @rooms[i].userid)
        if @rela.nil?
          @marks[i] = 1
        else
          @marks[i] = 0
        end
      end
    end
    @rooms.each_with_index do |room, i|
      if room.nil? == false
        @roomids[i] = room.userid
        if room.nickname.nil? == false && room.nickname != ""
          @nicknames[i] = @rooms[i].nickname
        end
        if room.intro.nil? == false && room.intro != ""
          @intros[i] = @rooms[i].intro
        end
      end
    end
    slim :user
  end
end

post '/logout' do
  session.clear
  "You have already left your room. Welcome back!"
end

post '/delete' do
  @currentuser = User.get(session[:value])
  @userstates = State.all(:userid => session[:value])
  @userroom = Room.first(:houseflr => @currentuser.houseflr, :housenum => @currentuser.housenum)
  @userrelations = Relation.all(:setuperid => @currentuser.userid) + Relation.all(:receiverid => @currentuser.userid)
  @userroom.update :isempty => true
  @userroom.save
  @userstates.each do |userstate|
    userstate.destroy
  end
  @userrelations.each do |userrelation|
    userrelation.destroy
  end
  @currentuser.destroy
  session.clear
  "Check out successful!"
end

post '/login' do
  @paramsjason = request.body.read
  @paramshash = JSON.parse(@paramsjason)
  @currentuser = User.last(:username => @paramshash["username"])
  if @currentuser.nil?
    'ID "' + @paramshash["username"] + '" does not exist!'
  elsif Digest::MD5.hexdigest(@paramshash["password"]) == @currentuser.password
    session[:value] = @currentuser.userid
    @currentuser.update :currentflr => rand(60)+1
    @currentuser.save
    "Check in successful!"
  else
    "Your secret key was wrong!"
  end
end

post '/signup' do
  @paramsjason = request.body.read
  @paramshash = JSON.parse(@paramsjason)
  if User.last(:username => @paramshash["username"]).nil?
    @emptyroom = Room.first(:isempty => true)
    if @emptyroom.nil?
      "No empty rooms!"
    else
      @signuser = User.new :username => @paramshash["username"]
      @signuser.save
      if @signuser.userid <= 360
        @arr = IO.readlines("rand.txt")
        @signuser.update :password => Digest::MD5.hexdigest(@paramshash["password1"]), :signdate => Time.now, :houseflr => @arr[@signuser.userid-1].chomp.to_i / 6 + 1, :housenum => @arr[@signuser.userid-1].chomp.to_i % 6 + 1, :isreal => true
        @signuser.save
        @signroom = Room.first(:houseflr => @signuser.houseflr, :housenum => @signuser.housenum)
        @signroom.update :isempty => false
        @signroom.save
        "Subscribe successful! Please check in!"
      else
        @signuser.update :password => Digest::MD5.hexdigest(@paramshash["password1"]), :signdate => Time.now, :houseflr => @emptyroom.houseflr, :housenum => @emptyroom.housenum, :isreal => true
        @signuser.save
        @emptyroom.update :isempty => false
        @emptyroom.save
        "Subscribe successful! Please check in!"       
      end
    end
  else
    'ID "' + @paramshash["username"] + '" already exists! Please use another id!'
  end
end

post '/edit' do
  if session[:value].nil?
    redirect to('/')
  else
    @currentuser = User.get(session[:value])
    @paramsjason = request.body.read
    @paramshash = JSON.parse(@paramsjason)
    @currentuser.update :nickname => @paramshash["nickname"], :gender => @paramshash["gender"], :intro => @paramshash["introduction"]
    @currentuser.save
    if @currentuser.nickname.nil? == false || @currentuser.nickname != ""
      @nickname = @currentuser.nickname
    else
      @nickname = "No nickname!"
    end
    if @currentuser.intro.nil? == false || @currentuser.intro != ""
      @intro = @currentuser.intro
    else
      @intro = "No introduction!"
    end
    if @currentuser.avatar.nil?
      @avatar = 0
    else
      @avatar = @currentuser.avatar
    end
    @send = Hash.new
    @send = {"nickname" => @nickname, "gender" => @currentuser.gender, "intro" => @intro, "avatar" => @avatar}
    @send.to_json
  end
end

post '/upload' do
  if session[:value].nil?
    redirect to('/')
  else
    @currentuser = User.get(session[:value])
    if params[:avatar].nil? && params[:bgmusic].nil? && params[:bgimg].nil?
    elsif params[:avatar].nil? == false && params[:bgmusic].nil? && params[:bgimg].nil?
      @atempfile = params[:avatar][:tempfile]
      @afilename = params[:avatar][:filename]
      @avatarname = @currentuser.userid.to_s + File.extname(@afilename)
      @atarget = "public/images/avatars/" + @avatarname
      File.new(@atarget, "w")
      File.open(@atarget, 'wb') {|f| f.write @atempfile.read }
      @currentuser.update :avatar => "images/avatars/" + @avatarname
      @currentuser.save
    elsif params[:avatar].nil? && params[:bgmusic].nil? == false && params[:bgimg].nil?
      @mtempfile = params[:bgmusic][:tempfile]
      @mfilename = params[:bgmusic][:filename]
      @bgmusicname = @currentuser.userid.to_s + ".mp3"
      @mtarget = "public/music/bgmusic/" + @bgmusicname
      File.new(@mtarget, "w")
      File.open(@mtarget, 'wb') {|f| f.write @mtempfile.read }
      @currentuser.update :bgmusic => "music/bgmusic/" + @bgmusicname
      @currentuser.save
    elsif params[:avatar].nil? && params[:bgmusic].nil? && params[:bgimg].nil? == false
      @itempfile = params[:bgimg][:tempfile]
      @ifilename = params[:bgimg][:filename]
      @bgimgname = @currentuser.userid.to_s + File.extname(@ifilename)
      @itarget = "public/images/bgimgs/" + @bgimgname
      File.new(@itarget, "w")
      File.open(@itarget, 'wb') {|f| f.write @itempfile.read }
      @currentuser.update :bgimg => "images/bgimgs/" + @bgimgname
      @currentuser.save
    elsif params[:avatar].nil? == false && params[:bgmusic].nil? == false && params[:bgimg].nil?
      @atempfile = params[:avatar][:tempfile]
      @afilename = params[:avatar][:filename]
      @mtempfile = params[:bgmusic][:tempfile]
      @mfilename = params[:bgmusic][:filename]
      @avatarname = @currentuser.userid.to_s + File.extname(@ifilename)
      @bgmusicname = @currentuser.userid.to_s + ".mp3"
      @atarget = "public/images/avatars/" + @avatarname
      File.new(@atarget, "w")
      File.open(@atarget, 'wb') {|f| f.write @atempfile.read }
      @mtarget = "public/music/bgmusic/" + @bgmusicname
      File.new(@mtarget, "w")
      File.open(@mtarget, 'wb') {|f| f.write @mtempfile.read }
      @currentuser.update :avatar => "images/avatars/" + @avatarname, :bgmusic => "music/bgmusic/" + @bgmusicname
      @currentuser.save
    elsif params[:avatar].nil? == false && params[:bgmusic].nil? && params[:bgimg].nil? == false
      @atempfile = params[:avatar][:tempfile]
      @afilename = params[:avatar][:filename]
      @itempfile = params[:bgimg][:tempfile]
      @ifilename = params[:bgimg][:filename]
      @avatarname = @currentuser.userid.to_s + File.extname(@afilename)
      @bgimgname = @currentuser.userid.to_s + File.extname(@ifilename)
      @atarget = "public/images/avatars/" + @avatarname
      File.new(@atarget, "w")
      File.open(@atarget, 'wb') {|f| f.write @atempfile.read }
      @itarget = "public/images/bgimgs/" + @bgimgname
      File.new(@itarget, "w")
      File.open(@itarget, 'wb') {|f| f.write @itempfile.read }
      @currentuser.update :avatar => "images/avatars/" + @avatarname, :bgimg => "images/bgimgs/" + @bgimgname
      @currentuser.save
    elsif params[:avatar].nil? && params[:bgmusic].nil? == false && params[:bgimg].nil? == false
      @mtempfile = params[:bgmusic][:tempfile]
      @mfilename = params[:bgmusic][:filename]
      @itempfile = params[:bgimg][:tempfile]
      @ifilename = params[:bgimg][:filename]
      @bgmusicname = @currentuser.userid.to_s + ".mp3"
      @bgimgname = @currentuser.userid.to_s + File.extname(@ifilename)
      @mtarget = "public/music/bgmusic/" + @bgmusicname
      File.new(@mtarget, "w")
      File.open(@mtarget, 'wb') {|f| f.write @mtempfile.read }
      @itarget = "public/images/bgimgs/" + @bgimgname
      File.new(@itarget, "w")
      File.open(@itarget, 'wb') {|f| f.write @itempfile.read }
      @currentuser.update :bgmusic => "music/bgmusic/" + @bgmusicname, :bgimg => "images/bgimgs/" + @bgimgname
      @currentuser.save
    else
      @atempfile = params[:avatar][:tempfile]
      @afilename = params[:avatar][:filename]
      @mtempfile = params[:bgmusic][:tempfile]
      @mfilename = params[:bgmusic][:filename]
      @itempfile = params[:bgimg][:tempfile]
      @ifilename = params[:bgimg][:filename]
      @avatarname = @currentuser.userid.to_s + File.extname(@afilename)
      @bgmusicname = @currentuser.userid.to_s + ".mp3"
      @bgimgname = @currentuser.userid.to_s + File.extname(@ifilename)
      @atarget = "public/images/avatars/" + @avatarname
      File.new(@atarget, "w")
      File.open(@atarget, 'wb') {|f| f.write @atempfile.read }
      @mtarget = "public/music/bgmusic/" + @bgmusicname
      File.new(@mtarget, "w")
      File.open(@mtarget, 'wb') {|f| f.write @mtempfile.read }
      @itarget = "public/images/bgimgs/" + @bgimgname
      File.new(@itarget, "w")
      File.open(@itarget, 'wb') {|f| f.write @itempfile.read }
      @currentuser.update :avatar => "images/avatars/" + @avatarname, :bgmusic => "music/bgmusic/" + @bgmusicname, :bgimg => "images/bgimgs/" + @bgimgname
      @currentuser.save
    end
    redirect to('/')
  end
end

post '/pswd' do
  if session[:value].nil?
    redirect to('/')
  else
    @currentuser = User.get(session[:value])
    @paramsjason = request.body.read
    @paramshash = JSON.parse(@paramsjason)
    if Digest::MD5.hexdigest(@paramshash["oldpswd"]) == @currentuser.password
      @currentuser.update :password => Digest::MD5.hexdigest(@paramshash["newpswd1"])
      @currentuser.save
      session.clear
      "Change password successful! Please check in!"
    else
      "Failed to change password! Please retry!"     
    end
  end
end

post '/state' do
  if session[:value].nil?
    redirect to('/')
  else
    @currentuser = User.get(session[:value])
    @paramstring = request.body.read
    @state = State.new :userid => @currentuser.userid, :content => @paramstring, :statedate => Time.now
    @state.save
    @liststates = Array.new(7, '')
    @statesdate = Array.new(7, '')
    @userstates = State.all(:userid => @currentuser.userid, :limit => 7,  :order => [ :stateid.desc ])
    @userstates.each_with_index do |userstate, i|
      @statecontent = userstate.content
      @statesdate[i] = DateTime.parse(userstate.statedate.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s + " : "
      @liststates[i] = userstate.content
    end
    @send = Hash.new
    @send = {"date" => @statesdate, "state" => @liststates}
    @send.to_json
  end
end

post '/follow' do
  if session[:value].nil?
    redirect to('/')
  else
    @currentuser = User.get(session[:value])
    @paramstring = request.body.read.to_i
    @followuser = User.get(@paramstring)
    @newrelation = Relation.last(:setuperid => @currentuser.userid, :receiverid => @paramstring)
    @newrelation = Relation.new :setuper => @currentuser.username, :setuperid => @currentuser.userid, :receiver => @followuser.username, :receiverid => @followuser.userid, :builddate => Time.now
    @newrelation.save
  end
end

post '/unfollow' do
  if session[:value].nil?
    redirect to('/')
  else
    @currentuser = User.get(session[:value])
    @paramstring = request.body.read.to_i
    @followuser = User.get(@paramstring)
    @derelation = Relation.last(:setuperid => @currentuser.userid, :receiverid => @paramstring)
    @derelation.destroy 
  end
end
post '/lift' do
  if session[:value].nil?
    redirect to('/')
  else
    @currentuser = User.get(session[:value])
    @currentuser.update :currentflr => rand(60)+1
    @currentuser.save
    redirect to('/')
  end
end
post '/floor1' do
  if session[:value].nil?
    redirect to('/')
  else
    @currentuser = User.get(session[:value])
    @currentuser.update :currentflr => 1
    @currentuser.save
    redirect to('/')
  end
end
