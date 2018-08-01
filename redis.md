## redis

	
	REmote DIctionary Server    Redis
	
	是一个key-value存储系统。
	
	Redis是一个开源的使用ANSI C语言编写、遵守BSD协议、支持网络、
	
	可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。
	
	它通常被称为数据结构服务器，
	
	因为值（value）可以是 字符串(String), 哈希(Map), 列表(list), 
	
	集合(sets) 和 有序集合(sorted sets)等类型。
	
	




## redis memcached

- 对比

		
		redis是开源,BSD许可,高级的key-value存储系统.
		 
		可以用来存储字符串,哈希结构,链表,集合,因此,常用来提供数据结构服务
		
		redis和memcached相比,的独特之处:
		
		1: redis可以用来做存储(storge) memccached是用来做缓存(cache)
		  
		  这个特点主要因为其有”持久化”的功能 ---将内存数据写到硬盘上
		
		2: 存储的数据有”结构”   对于memcached来说,存储的数据,只有1种类型--”字符串”
		
		  而redis则可以存储字符串,链表,哈希结构,集合,有序集合.
		
		
		
	
	
## redis安装

- 步骤
	
		
		1. wget http://download.redis.io/releases/redis-4.0.10.tar.gz
		
		2. tar -zxvf redis-4.0.10.tar.gz
		
		3. cd redis-4.0.10/src
		
		4. make test
		
		5. yum install -y tcl
		
		6. make PREFIX=/usr/local/redis install
		
		7. cp /usr/local/src/redis-4.0.10/redis.conf  /usr/local/redis/redis.conf
		
		8. vim ./redis.conf
			
			daemonize yes
			

- 目录
	
		
		redis-benchmark          redis性能测试工具
		
		redis-check-aof          检查aof日志工具
		
		redis-check-dump         检查rbd日志工具
		
		redis-cli                redis命令行工具
		
		redis-server             redis服务进程
		
		
	
	
- 启动

	
					
		./bin/redis-server ./redis.conf
		
		port 6379
		
		连接 
		
			redis/bin/redis-cli
		
			退出
				
				SHUTDOWN
				
	

- key的命令
	
		
		keys *    
		// 返回所有key
		
		在redis里,允许模糊查询key  有3个通配符 *, ? ,[]
		
		*: 通配任意多个字符
		
		?: 通配单个字符
		
		[]: 通配括号内的某1个字符
		
		
		
		randomkey 
		// 返回随机key
		
		
		exists key
		// 判断key是否存在,返回1/0
		
		type key
		//返回key存储的值的类型
		// 有 string, link, set, order set, hash
		
		
		
		del key1 key2 ... Keyn
		// 作用: 删除1个或多个键
		// 返回值: 不存在的key忽略掉,返回真正删除的key的数量
		
		rename key newkey
		// 作用: 给key赋一个新的key名
		// 注:如果newkey已存在,则newkey的原值被覆盖
		
		renamenx key newkey  
		// 作用: 把key改名为newkey
		// 返回: 发生修改返回1,未发生修改返回0
		// 注: nx--> not exists, 即, newkey不存在时,作改名动作
		
		
		redis在redis.conf配置文件默认开启16个databases数据库
		
		默认是使用0号服务器
		
		select n; 选择n号服务器
		
		move keyName n; // 将key移动n号服务器上
		
		ttl key 
		// 作用: 查询key的生命周期
		// 返回: 秒数
		
		注:对于不存在的key或已过期的key/不过期的key,都返回-1
		Redis2.8中,对于不存在的key,返回-2
		
		
		expire key 整型值
		// 作用: 设置key的生命周期,以秒为单位
		
		
		persist key
		// 作用: 把指定key置为永久有效
		
		
	
- string的命令
	
		
		set key value [ex 秒数] / [px 毫秒数]  [nx] /[xx]
		
		如: set a 1 ex 10 , 10秒有效
		Set a 1 px 9000  , 9秒有效
		
		注: 如果ex,px同时写,以后面的有效期为准
		如 set a 1 ex 100 px 9000, 实际有效期是9000毫秒
		
		nx: 表示key不存在时,执行操作
		xx: 表示key存在时,执行操作
		
		
		mset  multi set , 一次性设置多个键值
		例: mset key1 value1 key2 value2 ....
		
		get key 
		作用:获取key的值
		
		mget key1 key2 ..keyn
		作用:获取多个key的值
		
		
		setrange key offset value
		作用:把字符串的offset偏移字节,改成value  计数从0开始
		
		注意: 如果偏移量>字符长度, 该字符自动补\x00   
		
		redis 127.0.0.1:6379> set greet hello
		OK
		redis 127.0.0.1:6379> setrange greet 2 x
		(integer) 5
		redis 127.0.0.1:6379> get greet
		"hexlo"
		
		
		redis 127.0.0.1:6379> setrange greet 6 !
		(integer) 7
		redis 127.0.0.1:6379> get greet
		"heyyo\x00!"
		
		
		getrange key start stop
		作用: 是获取字符串中 [start, stop]范围的值 包含start和end
		
		注意: 对于字符串的下标,左数从0开始,右数从-1开始
		
			redis 127.0.0.1:6379> set title 'chinese'
			OK
			redis 127.0.0.1:6379> getrange title 0 3
			"chin"
			redis 127.0.0.1:6379> getrange title 1 -2
			"hines"
		
			注意: 
				1: start>=length, 则返回空字符串
				2: stop>=length,则截取至字符结尾
				3: 如果start 所处位置在stop右边, 返回空字符串
		
		
		append key value
		作用: 把value追加到key的原值上
		
		
		
		getset key newvalue
		作用: 获取并返回旧值,设置新值
			redis 127.0.0.1:6379> set cnt 0
			OK
			redis 127.0.0.1:6379> getset cnt 1
			"0"
			redis 127.0.0.1:6379> getset cnt 2
			"1"
		
		
		incr key
		作用: 指定的key的值加1,并返回加1后的值
		
		注意:
		1:不存在的key当成0,再incr操作
		2: 范围为64有符号
		
		
		incrby key number
		作用: 增加number
		
			redis 127.0.0.1:6379> incrby age  90 2
			(integer) 92
		
		incrbyfloat key floatnumber
		作用: 当成浮点数增加
		
			redis 127.0.0.1:6379> incrbyfloat age 3.5
			"95.5"
		
		decr key
		作用: 减少1
		
			redis 127.0.0.1:6379> set age 20
			OK
			redis 127.0.0.1:6379> decr age
			(integer) 19
			
		decrby key number
		作用: 减多少
		
		
			redis 127.0.0.1:6379> decrby age 3
			(integer) 16
		
		
		getbit key offset
		作用:获取值的二进制表示,对应位上的值(从左,从0编号)
		
			redis 127.0.0.1:6379> set char A
			OK
			redis 127.0.0.1:6379> getbit char 1
			(integer) 1
			redis 127.0.0.1:6379> getbit char 2
			(integer) 0
			redis 127.0.0.1:6379> getbit char 7
			(integer) 1
		
		
		setbit  key offset value
		设置offset对应二进制位上的值
		返回: 该位上的旧值
		
		注意: 
		1:如果offset过大,则会在中间填充0,
		2: offset最大大到多少
		3:offset最大2^32-1,可推出最大的的字符串为512M
		
		
		bitop operation destkey key1 [key2 ...]
		
		对key1,key2..keyN作operation,并将结果保存到 destkey 上。
		operation 可以是 AND 、 OR 、 NOT 、 XOR
		
			redis 127.0.0.1:6379> setbit lower 7 0
			(integer) 0
			redis 127.0.0.1:6379> setbit lower 2 1
			(integer) 0
			redis 127.0.0.1:6379> get lower
			" "
			redis 127.0.0.1:6379> set char Q
			OK
			redis 127.0.0.1:6379> get char
			"Q"
			redis 127.0.0.1:6379> bitop or char char lower
			(integer) 1
			redis 127.0.0.1:6379> get char
			"q"
			
		注意: 对于NOT操作, key不能多个
		
		


- link链表命令

		
		lpush key value 
		作用: 把值插入到链接头部  l--left 
		计数是从左往右从0开始  到最后是-1
		
		
		rpop key
		作用: 返回并删除链表尾元素
		
		rpush
		作用: 把值插入到链接头部  r--right
		
		lpop
		作用: 返回并删除链表头元素
		
		
		lrem key count value
		作用: 从key链表中删除 value值
		
		lrem arr 1 b
		从链表arr中从头部开始删除一个b
		
			注: 删除count的绝对值个value后结束
			
			Count>0 从表头删除
			
			Count<0 从表尾删除
		
		
		ltrim key start stop
		作用: 剪切key对应的链接,切[start,stop]一段,并把该段重新赋给key
		
		lindex key index
		作用: 返回index索引上的值,
			如  lindex key 2
		
		llen key
		作用:计算链接表的元素个数
		
			redis 127.0.0.1:6379> llen task
			(integer) 3
			redis 127.0.0.1:6379> 
		
		
		linsert  key after|before search value
		作用: 在key链表中寻找’search’,并在search值之前|之后,.插入value
			
			注: 一旦找到一个search后,命令就结束了,因此不会插入多个value
		
		
		rpoplpush source dest
		作用: 把source的尾部拿出,放在dest的头部 这是一个原子性的操作 保证了安全性
		并返回 该单元值
		
		场景: task + bak 双链表完成安全队列
		
		
		brpop ,blpop  key timeout
		作用:等待弹出key的尾/头元素, 
		Timeout为等待超时时间
		如果timeout为0,则一直等待
		
		场景: 长轮询Ajax,在线聊天时,能够用到
		
		
		
		



- set命令

		
		
		集合的性质: 唯一性,无序性,确定性
		
		注: 在string和link的命令中,可以通过range 来访问string中的某几个字符或某几个元素
		但,因为集合的无序性,无法通过下标或范围来访问部分元素.
		
		因此想看元素,要么随机先一个,要么全选
		
		
		sadd key  value1 value2
		作用: 往集合key中增加元素  添加成功返回1 失败0 
		
		唯一性就是体现在 一个值只能有一个
		
		srem value1 value2
		作用: 删除集合中集为 value1 value2的元素
			返回值: 忽略不存在的元素后,真正删除掉的元素的个数
		
		spop key
		作用: 返回并删除集合中key中1个随机元素
		
		随机--体现了无序性
		
		srandmember key
		作用: 返回集合key中,随机的1个元素.
		
		sismember key  value
		作用: 判断value是否在key集合中
		是返回1,否返回0
		
		smembers key
		作用: 返回集中中所有的元素
		
		scard key
		作用: 返回集合中元素的个数
		
		smove source dest value
		作用:把source中的value删除,并添加到dest集合中
		
		
		
		sinter  key1 key2 key3
		作用: 求出key1 key2 key3 三个集合中的交集,并返回
		
			redis 127.0.0.1:6379> sadd s1 0 2 4 6
			(integer) 4
			redis 127.0.0.1:6379> sadd s2 1 2 3 4
			(integer) 4
			redis 127.0.0.1:6379> sadd s3 4 8 9 12
			(integer) 4
			redis 127.0.0.1:6379> sinter s1 s2 s3
			1) "4"
			redis 127.0.0.1:6379> sinter s3 s1 s2
			"4"
		
		sinterstore dest key1 key2 key3
		作用: 求出key1 key2 key3 三个集合中的交集,并赋给dest
		
		
		suion key1 key2.. Keyn
		作用: 求出key1 key2 keyn的并集,并返回
		
		sdiff key1 key2 key3 
		作用: 求出key1与key2 key3的差集
			即 key1 - key2 - key3 
		
		
	
	
- order set 有序集合命令

		
		zadd key score1 value1 score2 value2 ..
		添加元素
		
			redis 127.0.0.1:6379> zadd stu 18 lily 19 hmm 20 lilei 21 lilei
			(integer) 3
		
		zrem key value1 value2 ..
		作用: 删除集合中的元素
			
		zremrangebyscore key min max
		作用: 按照socre来删除元素,删除score在[min,max]之间的
		
			redis 127.0.0.1:6379> zremrangebyscore stu 4 10
			(integer) 2
			redis 127.0.0.1:6379> zrange stu 0 -1
			1) "f"
		
		zremrangebyrank key start end
		作用: 按排名删除元素,删除名次在[start,end]之间的
		
			redis 127.0.0.1:6379> zremrangebyrank stu 0 1
			(integer) 2
			redis 127.0.0.1:6379> zrange stu 0 -1
			1) "c"
			2) "e"
			3) "f"
			4) "g"
		
		zrank key member
		查询member的排名(升续 0名开始)
		
		zrevrank key memeber
		查询 member的排名(降续 0名开始)
		
		ZRANGE key start stop [WITHSCORES]
		把集合排序后,返回名次[start,stop]的元素
		默认是升续排列 
		Withscores 是把score也打印出来
		
		zrevrange key start stop
		作用:把集合降序排列,取名字[start,stop]之间的元素
		
		zrangebyscore  key min max [withscores] limit offset N
		作用: 集合(升续)排序后,取score在[min,max]内的元素,
		并跳过 offset个, 取出N个
		
		
		
		zcard key
		返回元素个数
		
		zcount key min max
		返回[min,max] 区间内元素的数量
		
		
		zinterstore destination numkeys key1 [key2 ...] 
		[WEIGHTS weight [weight ...]] 
		[AGGREGATE SUM|MIN|MAX]
		求key1,key2的交集,key1,key2的权重分别是 weight1,weight2
		聚合方法用: sum |min|max
		聚合的结果,保存在dest集合内
		
		注意: weights ,aggregate如何理解?
		答: 如果有交集, 交集元素又有socre,score怎么处理?
		 Aggregate sum->score相加   , min 求最小score, max 最大score
		 
		另: 可以通过weigth设置不同key的权重, 交集时,socre * weights
		
		
		
	
	
- Hash 哈希的命令

		
		hset key field value
		作用: 把key中 filed域的值设为value
		注:如果没有field域,直接添加,如果有,则覆盖原field域的值
		
		hmset key field1 value1 [field2 value2 field3 value3 ......fieldn valuen]
		作用: 设置field1->N 个域, 对应的值是value1->N
		
		(对应PHP理解为  $key = array(file1=>value1, field2=>value2 ....fieldN=>valueN))
		
		
		hget key field
		作用: 返回key中field域的值
		
		hmget key field1 field2 fieldN
		作用: 返回key中field1 field2 fieldN域的值
		
		hgetall key
		作用:返回key中,所有域与其值
		
		hdel key field
		作用: 删除key中 field域
		
		hlen key
		作用: 返回key中元素的数量
		
		hexists key field
		作用: 判断key中有没有field域
		
		hinrby key field value
		作用: 是把key中的field域的值增长整型值value
		
		hinrby float  key field value
		作用: 是把key中的field域的值增长浮点值value
		
		hkeys key
		作用: 返回key中所有的field
		
		kvals key
		作用: 返回key中所有的value
		
		
		
