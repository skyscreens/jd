/ *
宠汪汪喂食（如果喂食80g失败，降级一个档次喂食（40g，依次类推）），三餐，建议一小时运行一次
更新时间：2020-11-03
活动入口：京东APP我的-更多工具-宠汪汪
支持京东多个账号
脚本兼容：QuantumultX，Surge，Loon，JSBox，Node.js
=============数量X ===============
[task_local]
＃京东宠汪汪喂食
15 0-23 / 1 * * * https://gitee.com/lxk0301/jd_scripts/raw/master/jd_joy_feedPets.js，tag =京东宠汪汪喂食，img-url = https：//raw.githubusercontent.com/ 58xinian / icon / master / jdcww.png，enabled = true
=============月球===============
[脚本]
cron“ 15 0-23 / 1 * * *”脚本路径= https：//gitee.com/lxk0301/jd_scripts/raw/master/jd_joy_feedPets.js,tag=京东宠汪汪喂食
=========浪涌=============
[脚本]
京东宠汪汪喂食=类型= cron，cronexp =“ 15 0-23 / 1 * * *”，唤醒系统= 1，超时= 3600，脚本路径= https：//gitee.com/lxk0301/jd_scripts/raw /master/jd_joy_feedPets.js
===============小火箭==========
京东宠汪汪喂食=类型= cron，脚本路径= https：//gitee.com/lxk0301/jd_scripts/raw/master/jd_joy_feedPets.js，cronexpr =“ 15 0-23 / 1 * * *”，超时= 3600 ，enable = true
* /
  const  $  =  new  Env （'宠汪汪🐕喂食' ）;
  const  notify  =  $ 。isNode （）吗？要求（'./sendNotify' ）：'' ;
  //Node.js用户请在jdCookie.js处填充京东ck;
  const  jdCookieNode  =  $ 。isNode （）吗？require （'./jdCookie.js' ）：'' ;
  
  // IOS等用户直接用NobyDa的jd cookie
  让 cookiesArr  =  [ ] ， cookie  =  '' ;
  如果 （$ 。isNode （）） {
    对象。键（jdCookieNode ）。forEach （（项目） =>  {
      cookiesArr 。推送（jdCookieNode [ item ] ）
    } ）
    如果 （过程。ENV 。JD_DEBUG  && 过程。ENV 。JD_DEBUG  ===  '假' ） 的控制台。log  =  （） =>  { } ;
  } 其他 {
    cookiesArr  =  [ $ 。getdata （'CookieJD' ）， $ 。getdata （'CookieJD2' ）， ... jsonParse （$ 。getdata （'CookiesJD' ） ||  “ []” ）。映射（项 => 项。饼干）] 。滤波器（项目 => ！ ！项）;
  }
  让 jdNotify  =  true ; //是否开启静默运行。或是真正开启
  让 message  =  '' ， subTitle  =  '' ;
  const  JD_API_HOST  =  'https: //jdjoy.jd.com '
  //让FEED_NUM =（$ .getdata（'joyFeedCount'）* 1）|| 80; //喂食数量任选10g，任选10,20,40,80，其他数字不可。
  让 FEED_NUM  =  80 ;
  
  ！（异步 （） =>  {
    如果 （！cookiesArr [ 0 ] ） {
      $ 。msg （$ 。name ， '【提示】请先获取京东账号一cookie \ n直接使用NobyDa的京东签到获取' ， 'https: //bean.m.jd.com/bean/signIndex.action ' ， { “ open-url“：” https://bean.m.jd.com/bean/signIndex.action“ } ）；
      回报;
    }
    对于 （让 我 =  0 ; 我 <  cookiesArr 。长度; 我++ ） {
      如果 （cookiesArr [ i ] ） {
        cookie  =  cookiesArr [ i ] ；
        $ 。用户名 =  decodeURIComponent （饼干。匹配（/ pt_pin = （。+？） ; /） && 饼干。匹配（/ pt_pin = （。+？） ; /）[ 1 ] ）
        $ 。指数 =  i  +  1 ;
        $ 。isLogin  =  true ;
        $ 。nickName  =  '' ;
        等待 TotalBean （）;
        控制台。日志（`\ n开始【京东账号$ { $ 。索引}】$ { $ 。昵称 ||  $ 。用户名} \ N` ）;
        如果 （！$ 。isLogin ） {
          $ 。味精（$ 。名称， `【提示】饼干已失效` ， `京东账号$ { $ 。指数}  $ { $ 。绰号 ||  $ 。用户名} \ n请重新登录获取\ nhttps：//bean.m。 jd.com / bean / signIndex.action` ， { “ open-url”：“ https://bean.m.jd.com/bean/signIndex.action” } ）；
  
          如果 （$ 。isNode （）） {
            等待 通知。sendNotify （` $ { $ 。名}饼干已失效- $ { $ 。用户名} ` ， `京东账号$ { $ 。指数}  $ { $ 。用户名} \ n请重新登录获取cookie` ）;
          }
          继续
        }
        消息 =  '' ;
        subTitle  =  '' ;
        如果 （$ 。isNode （）） {
          如果 （过程。ENV 。JOY_FEED_COUNT ） {
            如果 （[ 0 ， 10 ， 20 ， 40 ， 80 ] 。的indexOf （过程。ENV 。JOY_FEED_COUNT  *  1 ） >  - 1 ） {
              FEED_NUM  = 流程。ENV 。JOY_FEED_COUNT个？过程。ENV 。JOY_FEED_COUNT  *  1：FEED_NUM ；
            } 其他 {
              控制台。日志（`您输入的JOY_FEED_COUNT为非法数字，请重新输入` ）;
            }
          }
        }
        等待 feedPets （FEED_NUM ）; //喂食
        等待 三餐（）; //三餐
        等待 showMsg （）;
      }
    }
  } ）（）
      。抓（（e ） =>  {
        $ 。日志（'' ， `❌ $ { $ 。名字}，失败原因：$ { é } `！ ， '' ）
      } ）
      。最后（（） =>  {
        $ 。完成（）;
      } ）
  函数 showMsg （） {
    $ 。日志（`\ n $ { message } \ n` ）;
    jdNotify  =  $ 。getdata （'jdJoyNotify' ）吗？$ 。getdata （'jdJoyNotify' ）：jdNotify ;
    如果 （！jdNotify  ||  jdNotify  ===  'false' ） {
      //$.msg($.name，subTitle，`【京东账号$ {$。index}] $ {$。UserName} \ n` + message）;
    }
  }
  函数 feedPets （feedNum ） {
    返回 新的 Promise （resolve  =>  {
      控制台。log （您设置的喂食数量:: $ { FEED_NUM } g \ n` ）;
      如果 （FEED_NUM  ===  0 ） { 控制台。日志（`跳出喂食` ）; 解决（）; 返回 }
      控制台。log （`实际的喂食数量:: $ { feedNum } g \ n` ）;
      让 opt  =  {
        网址：`//jdjoy.jd.com/common/pet/feed? feedCount= $ { feedNum }＆reqSource = h5` ，
        //网址：“ // draw.jdfcloud.com/common/pet/getPetTaskConfig?reqSource=h5”，
        方法：“ GET” ，
        数据：{ } ，
        凭据：“包括” ，
        标头：{ “ content-type”：“ application / json” }
      }
      const  url  =  “ https：” +  taroRequest （opt ）[ 'url' ]
      const  options  =  {
        URL ，
        标头：{
          “ Cookie”：cookie ，
          'reqSource'：'h5' ，
          '主机'：'jdjoy.jd.com' ，
          '连接'：'保持活动状态' ，
          'Content-Type'：'application / json' ，
          'Referer'：'https : //jdjoy.jd.com/pet/index ' ，
          “用户代理”：$ 。isNode （）吗？（过程。ENV 。JD_USER_AGENT？过程。ENV 。JD_USER_AGENT：（要求（'./USER_AGENTS' ）。 USER_AGENT ））：（$ 。的GetData （'JDUA' ）？ $ 。的GetData （'JDUA' ）： “jdapp; iPhone ; 9.2.2; 14.2;％E4％BA％AC％E4％B8％9C / 9.2.2 CFNetwork / 1206 Darwin / 20.1.0“），
          'Accept-Language'：'zh-cn' ，
          'Accept-Encoding'：'gzip，deflate，br' ，
        }
      }
      $ 。get （options ， async  （err ， resp ， data ） =>  {
        尝试 {
          $ 。数据 =  JSON 。解析（数据）;
          如果 （$ 。数据。成功） {
            如果 （$ 。数据。的errorCode  ===  'feed_ok' ） {
              控制台。日志（'喂食成功' ）
              消息 + =  `【喂食成功】$ { feedNum } g \ n` ;
            } 否则 如果 （$ 。数据。的errorCode  ===  'time_error' ） {
              控制台。log （'喂食失败：正在食用' ）
              message  + =  `【喂食失败】您的汪汪正在食用\ n` ;
            } 否则 如果 （$ 。数据。的errorCode  ===  'food_insufficient' ） {
              控制台。log （`当前喂食$ { feedNum } g狗粮不够，现为您降低一档次喂食\ n` ）
              如果 （（feedNum ） ===  80 ） {
                feedNum  =  40 ;
              } 否则， 如果 （（feedNum ） ===  40 ） {
                feedNum  =  20 ;
              } 否则， 如果 （（feedNum ） ===  20 ） {
                feedNum  =  10 ;
              } 否则， 如果 （（feedNum ） ===  10 ） {
                feedNum  =  0 ;
              }
              //如果喂食设置的数量失败，就降低一个档次喂食。
              如果 （（feedNum ） ！==  0 ） {
                等待 feedPets （feedNum ）;
              } 其他 {
                控制台。日志（'您的狗粮已不足10g' ）
                消息 + =  `【喂食失败】您的狗粮已不足10g \ n` ;
              }
            } 其他 {
              控制台。日志（`其他状态$ { $ 。数据。的errorCode } ` ）
            }
          }
        } 抓住 （e ） {
          $ 。logErr （e ， resp ）;
        } 最后 {
          决心（$ 。数据）;
        }
      } ）
    } ）
  }
  
  //三餐
  功能 ThreeMeals （） {
    返回 新的 Promise （resolve  =>  {
      让 opt  =  {
        网址：“ // jdjoy.jd.com/common/pet/getFood?taskType=ThreeMeals&reqSource=h5” ，
        //网址：“ // draw.jdfcloud.com/common/pet/getPetTaskConfig?reqSource=h5”，
        方法：“ GET” ，
        数据：{ } ，
        凭据：“包括” ，
        标头：{ “ content-type”：“ application / json” }
      }
      const  url  =  “ https：” +  taroRequest （opt ）[ 'url' ]
      const  options  =  {
        URL ，
        标头：{
          “ Cookie”：cookie ，
          'reqSource'：'h5' ，
          '主机'：'jdjoy.jd.com' ，
          '连接'：'保持活动状态' ，
          'Content-Type'：'application / json' ，
          'Referer'：'https : //jdjoy.jd.com/pet/index ' ，
          “用户代理”：$ 。isNode （）吗？（过程。ENV 。JD_USER_AGENT？过程。ENV 。JD_USER_AGENT：（要求（'./USER_AGENTS' ）。 USER_AGENT ））：（$ 。的GetData （'JDUA' ）？ $ 。的GetData （'JDUA' ）： “jdapp; iPhone ; 9.2.2; 14.2;％E4％BA％AC％E4％B8％9C / 9.2.2 CFNetwork / 1206 Darwin / 20.1.0“），
          'Accept-Language'：'zh-cn' ，
          'Accept-Encoding'：'gzip，deflate，br' ，
        }
      }
      $ 。get （options ， async  （err ， resp ， data ） =>  {
        尝试 {
          数据 =  JSON 。解析（数据）;
          如果 （数据。成功） {
            如果 （数据。的errorCode  ===  '接收' ） {
              控制台。日志（`三餐结果领取成功` ）
              message  + =  `【三餐】领取成功，获得$ { data 。数据} g狗粮\ n` ;
            }
          }
        } 抓住 （e ） {
          $ 。logErr （resp ， e ）;
        } 最后 {
          解决（数据）;
        }
      } ）
    } ）
  }
  函数 jsonParse （str ） {
    如果 （typeof  str  ==  “ string” ） {
      尝试 {
        返回 JSON 。解析（str ）;
      } 抓住 （e ） {
        控制台。log （e ）;
        $ 。msg （$ 。name ， `` ， '不要随意在BoxJs输入框修改内容\ n建议通过脚本去获取cookie' ）
        返回 [ ] ;
      }
    }
  }
  函数 TotalBean （） {
    返回 新的 Promise （异步 resolve  =>  {
      const  options  =  {
        “ url”：`https：//wq.jd.com/user/info/QueryJDUserInfo？sceneval = 2` ，
        “标题”：{
          “ Accept”：“ application / json，text / plain，* / *” ，
          “ Content-Type”：“ application / x-www-form-urlencoded” ，
          “ Accept-Encoding”：“ gzip，deflate，br” ，
          “ Accept-Language”：“ zh-cn” ，
          “连接”：“保持活动” ，
          “ Cookie”：cookie ，
          “ Referer”：“ https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2” ，
          “用户代理”：$ 。isNode （）吗？（过程。ENV 。JD_USER_AGENT？过程。ENV 。JD_USER_AGENT：（要求（'./USER_AGENTS' ）。 USER_AGENT ））：（$ 。的GetData （'JDUA' ）？ $ 。的GetData （'JDUA' ）： “jdapp; iPhone ; 9.2.2; 14.2;％E4％BA％AC％E4％B8％9C / 9.2.2 CFNetwork / 1206 Darwin / 20.1.0“）
        }
      }
      $ 。post （options ， （err ， resp ， data ） =>  {
        尝试 {
          如果 （err ） {
            控制台。日志（` $ { JSON 。字符串化（ERR ）} ` ）
            控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
          } 其他 {
            如果 （数据） {
              数据 =  JSON 。解析（数据）;
              if  （data [ 'retcode' ]  ===  13 ） {
                $ 。isLogin  =  false ;  // cookie过期
                返回
              }
              if  （data [ 'retcode' ]  ===  0 ） {
                $ 。nickName  = 数据[ 'base' ] 。昵称;
              } 其他 {
                $ 。nickName  =  $ 。用户名
              }
            } 其他 {
              控制台。日志（`京东服务器返回空数据` ）
            }
          }
        } 抓住 （e ） {
          $ 。logErr （e ， resp ）
        } 最后 {
          解决（）;
        }
      } ）
    } ）
  }
  VAR  __encode  = 'jsjiami.com' ，_a = { } ， _0xb483 = [ “\ X5F \ 64 \ X65 \ X63 \ x6F \ 64 \ X65” ，“\ X68 \ X74 \ X74 \ X70 \ X3A \ X2F \ X2F \ x77 \ x77 \ x77 \ x2E \ x73 \ x6F \ x6A \ x73 \ x6F \ x6E \ x2E \ x63 \ x6F \ x6D \ x2F \ x6A \ x61 \ x76 \ x61 \ x73 \ x63 \ x72 \ x72 \ x69 \ x70 \ x74 \ x6F \ x62 \ x66 \ x75 \ x73 \ x63 \ x61 \ x74 \ x6F \ x72 \ x2E \ x68 \ x74 \ x6D \ x6C“ ] ；（函数（_0xd642x1 ）{_ 0xd642x1 [ _0xb483 [ 0 ] ] =  _0xb483 [ 1 ] } ）（_a ）; var  __Oxb227b = [ “ \ x69 \ x73 \ x4E \ x6F \ x64 \ x65” ，“ \ x63 \ x72 \ x79 \ x70 \ x74 \ x6F \ x2D \ x6A \ x73” ，“ \ x39 \ x38 \ x63 \ x31 \ x34 \ x63 \ x39 \ x39 \ x37 \ x66 \ x64 \ x65 \ x35 \ x30 \ x63 \ x63 \ x31 \ x38 \ x62 \ x64 \ x65 \ x66 \ x65 \ x65 \ x63 \ x66 \ x64 \ x34 \ x38 \ x63 \ x65 \ x62 \ x37“ ，” \ x70 \ x61 \ x72 \ x73 \ x65“ ，” \ x55 \ x74 \ x66 \ x38“ ，” \ x65 \ x6E \ x63“ ，” \ x65 \ x61 \ x36 \ x35 \ x33 \ x66 \ x34 \ x66 \ x33 \ x63 \ x35 \ x65 \ x64 \ x61 \ x31 \ x32“ ，” \ x63 \ x69 \ x70 \ x68 \ x65 \ x72 \ x74 \ x65 \ x65 \ x78 \ x74“ ，” \ x43 \ x42 \ x43“ ，” \ x6D \ x6F \ x64 \ x65“ ，” \ x50 \ x6B \ x63 \ x73 \ x37“ ，“ \ x65 \ x6E \ x63 \ x72 \ x79 \ x70 \ x74” ，“ \ x41 \ x45 \ x53” ，“ \ x48 \ x65 \ x78” ，“ \ x73 \ x74 \ x72 \ x69 \ x6E \ x67 \ x69 \ x66 \ x79“ ，” \ x42 \ x61 \ x73 \ x65 \ x36 \ x34“ ，” \ x64 \ x65 \ x63 \ x72 \ x79 \ x70 \ x74“ ，” \ x6C \ x65 \ x6E \ x67 \ x74 \ x68“ ，” \ x6D \ x61 \ x70“ ，” \ x73 \ x6F \ x72 \ x74“ ，” \ x6B \ x65 \ x79 \ x73“ ，” \ x67 \ x69 \ x66 \ x74“ ，” \ x70 \ x65 \ x74“ ，” \ x69 \ x6E \ x63 \ x6C \ x75 \ x64 \ x65 \ x73“ ，” \ x26“ ，” \ x6A \ x6F \ x69 \ x6E“ ，” \ x3D“，“ \ x3F” ，“ \ x69 \ x6E \ x64 \ x65 \ x78 \ x4F \ x66” ，"\x63\x6F\x6D\x6D\x6F\x6E\x2F","\x72\x65\x70\x6C\x61\x63\x65","\x68\x65\x61\x64\x65\x72","\x75\x72\x6C","\x72\x65\x71\x53\x6F\x75\x72\x63\x65\x3D\x68\x35","\x61\x73\x73\x69\x67\x6E","\x6D\x65\x74\x68\x6F\x64","\x47\x45\x54","\x64\x61\x74\x61","\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65","\x6B\x65\x79\x43\x6F\x64\x65","\x63\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65","","\x67\x65\x74","\x70\x6F\x73\x74","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x5F","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x6C\x6F\x67","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];function taroRequest(_0x1226x2){const _0x1226x3= $ [ __Oxb227b [ 0x0 ] ] （）？要求（__Oxb227b [ 0x1 ] ）：CryptoJS ; const  _0x1226x4 = __Oxb227b [ 0x2 ] ; const  _0x1226x5 = _0x1226x3 [ __Oxb227b [ 0x5 ] ] [ __Oxb227b [ 0x4 ] ] [ __Oxb227b [ 0x3 ] ] （_0x1226x4）; const  _0x1226x6 = _0x1226x3 [ __Oxb227b [ 0x5 ] ] [ __Oxb227b [ 0x4 ] ] [ __Oxb227b [ 0x3 ] ] （__Oxb227b [ 0x6 ] ）; 让 _0x1226x7 = { “ \ x41 \ x65 \ x73 \ x45 \ x6E \ x63 \ x72 \ x79 \ x70 \ x74”：函数 _0x1226x8 （_0x1226x2 ）{ var  _0x1226x9 = _0x1226x3 [ __Oxb227b [0x5 ] ] [ __Oxb227b [ 0x4 ] ] [ __Oxb227b [ 0x3 ] ] （_0x1226x2 ）; 返回 _0x1226x3 [ __Oxb227b [ 0xd中] ] [ __Oxb227b [位于0xC ] ] （_0x1226x9 ，_0x1226x5 ，{ “\ X69 \ X76” ：_0x1226x6 ，“\ X6D \ x6F \ 64 \ X65” ：_0x1226x3 [ __Oxb227b [ 0x9 ] ][ __Oxb227b [ 0x8 ] ] ，“ \ x70 \ x61 \ x64 \ x64 \ x69 \ x6E \ x67”：_0x1226x3 [ __Oxb227b [ 0xb ] ] [ __Oxb227b [ 0xa ] ] } ）[ __Oxb227b [ 0x7 ] ] 。toString （）} ，“ \ x41 \ x65 \ x73 \ x44 \ x65 \ x63 \ x72 \ x79 \ x70 \ x74”：函数 _0x1226xa （_0x1226x2 ）{ var  _0x1226x9 = _0x1226x3 [__Oxb227b[0x5]][__Oxb227b[0xe]][__Oxb227b[0x3]](_0x1226x2),_0x1226xb=_0x1226x3[__Oxb227b[0x5]][__Oxb227b[0x10]][__Oxb227b[0xf]](_0x1226x9);return _0x1226x3[__Oxb227b[0xd]] [ __Oxb227b [ 0×11 ] ] （_0x1226xb ，_0x1226x5 ，{ “\ X69 \ X76” ：_0x1226x6 ，“\ X6D \ x6F \ 64 \ X65” ：_0x1226x3 [ __Oxb227b [ 0x9 ] ] [ __Oxb227b [ 0x8中] ] ，“\ X70 \ x61 \ x64 \ x64 \ x69 \ x6E \ x67“：_0x1226x3 [ __Oxb227b [ 0xb ] ] [ __Oxb227b [ 0xa ] ] } ）。toString （_0x1226x3 [ __ Oxb227b [ 0x5 ] ] 。utf8 ）。toString （）} ，“ \ x42 \ x61 \ x73 \ x65 \ x36 \ x34 \ x45 \ x6E \ x63 \ x6F \ x64 \ x65”：函数 _0x1226xc （_0x1226x2 ）{ var  _0x1226x9 = _0x1226x3 [ __Oxb227b [ [ xx5x227b ] [ 0x5 ] [ 0x4 ] ] [ __Oxb227b [ 0x3 ] ] （_0x1226x2 ）; 返回 _0x1226x3 [ __Oxb227b [ 0x5 ] ] [ __Oxb227b [ 0x10 ] ] [ __Oxb227b [ 0xf ] ] （_0x1226x9 ）} ，“ \ x42 \ x61 \ x73 \ x65 \ x36 \ x34 \ x44 \ x65 \ x63 \ x6F \ “：函数 _0x1226xd （_0x1226x2 ）{返回 _0x1226x3 [ __Oxb227b [ 0x5 ] ] [ __Oxb227b [ 0x10 ]] [ __Oxb227b [ 0x3 ] ] （_0x1226x2 ）。toString （_0x1226x3 [ __Oxb227b [ 0x5 ] ] 。Utf8 ）} ，“ \ x4D \ x64 \ x35 \ x65 \ x6E \ x63 \ x6F \ x64 \ x65”：函数 _0x1226xe （_0x1226x2 ）{返回 _0x1226x3 。MD5 （_0x1226x2 ）。toString （）} ，“ \ x6B \ x65 \ x79 \ x43 \ x6F \ x64 \ x65”：__Oxb227b[0x2]};const _0x1226xf=function _0x1226x10(_0x1226x2,_0x1226x9){if(_0x1226x2 instanceof  Array){_0x1226x9= _0x1226x9|| [];for(var _0x1226xb=0;_0x1226xb< _0x1226x2[__Oxb227b[0x12]];_0x1226xb++){_0x1226x9 [ _0x1226xb ] =  _0x1226x10 （_0x1226x2 [ _0x1226xb ] ，_0x1226x9 [ _0x1226xb ] ）} }其他 { ！（_0x1226x2 的instanceof  阵列）&&  _0x1226x2 的instanceof  对象？（_0x1226x9 =  _0x1226x9 ||  { } ，对象[ __Oxb227b [ 0x15 ] ] （_0x1226x2 ）[__Oxb227b [ 0×14 ] ] （）[ __Oxb227b [ 0×13 ] ] （函数（_0x1226xb ）{ _0x1226x9 [ _0x1226xb ] =  _0x1226x10 （_0x1226x2 [ _0x1226xb ] ，_0x1226x9 [ _0x1226xb ] ）} ））：_0x1226x9 =  _0x1226x2 } ; 返回 _0x1226x9 } ; const  _0x1226x11=function _0x1226x12(_0x1226x2){for(var _0x1226x9=[__Oxb227b[0x16],__Oxb227b[0x17]],_0x1226xb=!1,_0x1226x3=0;_0x1226x3< _0x1226x9[__Oxb227b[0x12]];_0x1226x3++){var _0x1226x4=_0x1226x9[_0x1226x3];_0x1226x2[__Oxb227b[0x18]](_0x1226x4)&&  !_0x1226xb&& (_0x1226xb=  !0)};return _0x1226xb};const _0x1226x13=function _0x1226x14(_0x1226x2,_0x1226x9){if(_0x1226x9&& Object[__Oxb227b[0x15]](_0x1226x9)[__Oxb227b[0x12]]> 0){var _0x1226xb=Object[__Oxb227b[0x15]](_0x1226x9)[__Oxb227b[0x13]](function(_0x1226x2){return _0x1226x2+ __Oxb227b[0x1b]+ _0x1226x9[_0x1226x2]})[ __Oxb227b [ 0x1a ] ] （__Oxb227b [ 0x19 ] ）; 返回 _0x1226x2 [ __Oxb227b [ 0x1d ] ] （__Oxb227b [ 0x1c ] ）> =  0吗？_0x1226x2 +  __Oxb227b [ 0x19 ] +  _0x1226xb：_0x1226x2 +  __Oxb227b [ 0x1c ] +  _0x1226xb } ; 返回 _0x1226x2 };const _0x1226x15=function _0x1226x16(_0x1226x2){for(var _0x1226x9=_0x1226x6,_0x1226xb=0;_0x1226xb< _0x1226x9[__Oxb227b[0x12]];_0x1226xb++){var _0x1226x3=_0x1226x9[_0x1226xb];_0x1226x2[__Oxb227b[0x18]](_0x1226x3)&&  !_0x1226x2[__Oxb227b[0x18]](__Oxb227b[0x1e]+ _0x1226x3)&& (_0x1226x2= _0x1226x2[__Oxb227b[0x1f]](_0x1226x3,__Oxb227b[0x1e]+ _0x1226x3))};return _0x1226x2};var _0x1226x9=_0x1226x2，_0x1226xb = （_0x1226x9 [ __Oxb227b [ 0x20 ] ] ，_0x1226x9 [ __Oxb227b [ 0x21 ] ] ）；_0x1226xb + =  （_0x1226xb [ __Oxb227b [ 0x1d ] ] （__Oxb227b [ 0x1c ] ）>   - 1？__Oxb227b [ 0x19 ]：__Oxb227b [ 0x1c ] ）+  __Oxb227b[ 0x22 ] ; VAR  _0x1226x17 =函数 _0x1226x18 （_0x1226x2 ）{ VAR  _0x1226x9 = _0x1226x2 [ __Oxb227b [ 0×21 ] ] ，_0x1226xb = _0x1226x2 [ __Oxb227b [ 0X24 ] ] ，_0x1226x3 =无效（0 ）===  _0x1226xb？__Oxb227b [ 0x25 ]：_0x1226xb ，_0x1226x4= _0x1226x2 [ __Oxb227b [ 0x26 ] ] ，_0x1226x6 = _0x1226x2 [ __Oxb227b [ 0x20 ] ] ，_0x1226x19 = void （0 ）===  _0x1226x6吗？{ }：_0x1226x6 ，_0x1226x1a = _0x1226x3 [ __Oxb227b [ 0x27 ] ] （），_ 0x1226x1b = _0x1226x7 [ __Oxb227b [ 0x28]],_0x1226x1c=_0x1226x19[__Oxb227b[0x29]]|| _0x1226x19[__Oxb227b[0x2a]]|| __Oxb227b[0x2b],_0x1226x1d=__Oxb227b[0x2b],_0x1226x1e=+ new Date();return _0x1226x1d= __Oxb227b[0x2c]!== _0x1226x1a&& （__Oxb227b [ 0x2d ] ==  _0x1226x1a ||  __Oxb227b [ 0x2E读取] ==  _0x1226x1c [ __Oxb227b [ 0×27 ] ] （）&&  _0x1226x4 && 对象[ __Oxb227b [ 0×15 ] ] （_0x1226x4 ）[ __Oxb227b [ 0×12 ] ] ）？_0x1226x7 。Md5encode （_0x1226x7 。Base64Encode （_0x1226x7 。AesEncrypt （__Oxb227b [ 0x2B访问] +  JSON [ __Oxb227b [ 0xf ] ] （_0x1226xf （_0x1226x4 ））））+  __Oxb227b [值为0x2F ] +  _0x1226x1b +  __Oxb227b [值为0x2F ] +  _0x1226x1e ）：_0x1226x7 。Md5encode （__Oxb227b [ 0x2f ] +  _0x1226x1b + __Oxb227b [值为0x2F ] +  _0x1226x1e ），_0x1226x11 （_0x1226x9 ）&&  （_0x1226x9 =  _0x1226x13 （_0x1226x9 ，{ “\ X6C \ X6B \ X73” ：_0x1226x1d ，“\ X6C \ X6B \ X74” ：_0x1226x1e } ），_0x1226x9 =  _0x1226x15 （_0x1226x9 ）），对象[ __Oxb227b [ 0x23 ] ] （_0x1226x2 ，{“\ X75 \ X72 \ X6C” ：_0x1226x9 } ）} （_0x1226x2 = 对象[ __Oxb227b [ 0×23 ] ] （_0x1226x2 ，{ “\ X75 \ X72 \ X6C” ：_0x1226xb } ））; return  _0x1226x17 } （函数（_0x1226x1f ，_0x1226xf ，_0x1226x20 ，_0x1226x21 ，_0x1226x1c ，_0x1226x22 ）{_ 0x1226x22 =  __Oxb227b[0x30];_0x1226x21= function(_0x1226x19){if( typeof alert!== _0x1226x22){alert(_0x1226x19)};if( typeof console!== _0x1226x22){console[__Oxb227b[0x31]](_0x1226x19)}};_0x1226x20= function(_0x1226x3,_0x1226x1f){return _0x1226x3+ _0x1226x1f};_0x1226x1c= _0x1226x20(__Oxb227b[0x32],_0x1226x20(_0x1226x20(__Oxb227b[0x33],__Oxb227b[0x34]),__Oxb227b[0x35]));try{_0x1226x1f= __encode;if(!( typeof运算 _0x1226x1f ！==  _0x1226x22 &&  _0x1226x1f ===  _0x1226x20 （__Oxb227b [ 0x36 ] ，__Oxb227b [ 0×37 ] ）））{ _0x1226x21 （_0x1226x1c ）} }捕获（É ）{ _0x1226x21 （_0x1226x1c ）} } ）（{ } ）
  //更漂亮的忽略
  函数 Env （t ，e ）{类 s {构造函数（t ）{ this 。env = t } send （t ，e = “ GET” ）{ t = “ string” == typeof  t？{ url：t }：t ; 让 s = this 。得到; 返回“ POST” ===È && （小号=此。交），新 无极（（ê ，我）=> {小号。呼叫（这，吨，（吨，s ^ ，- [R ）=> {吨？我（吨）：È （小号）} ）} ）}得到（牛逼）{回报 这个。发送。调用（此。ENV ，牛逼）}后（牛逼）{返回 此。发送。电话（此。ENV ，牛逼，“POST” ）} }返回 新 类{构造函数（牛逼，ē ）{此。名字= t ，这个。http =新的 小号（本），这个。数据= null ，这。dataFile = “ box.dat” ，这个。原木= [ ] ，这个。isMute = ！1 ，这个。isNeedRewrite = ！1 ，这个。logSeparator = “ \ n” ，这个。startTime = （新 日期）。getTime （），对象。分配（this ，e ），this 。日志（“” ，`🔔 $ {这个。名字}，开始！' ）} isNode （）{返回“未定义” ！= typeof运算 模块&& ！！模块。出口} isQuanX （）{返回“未定义” ！= typeof运算 $任务} isSurge （）{返回“ undefined” ！= typeof  $ httpClient && “ undefined” == typeof  $ loon } isLoon （）{返回“ undefined” ！= typeof  $ loon } toObj （t ，e = null ）{ try { return  JSON 。解析（t ）} catch { return  e } } toStr（t ，e = null ）{试试{返回 JSON 。stringify （t ）} catch { return  e } } getjson （t ，e ）{让 s = e ; const  i = this 。getdata （t ）; 如果（i ）尝试{ s = JSON 。解析（此。的GetData （牛逼））}赶上{ }返回 小号} setjson （牛逼，ē ）{尝试{返回 此。使用setData （JSON 。字符串化（牛逼），ē ）}赶上{回报！1 } } getScript （t ）{返回 新的 Promise （e => {此。得到（{网址：牛逼} ，（牛逼，s ^ ，我）=> Ë （我））} ）}的runScript （牛逼，ē ）{返回 新的 承诺（小号=> {让 我=此。的GetData （“@chavy_boxjs_userCfgs .httpapi“ ）; i = i？我。替换（/ \ n / g ，“” ）。修剪（）：i ; 令 r = this 。getdata （“ @ chavy_boxjs_userCfgs.httpapi_timeout” ）；r = r？1 * r：20 ，r = e && e 。超时？e 。超时：r ; const [o ，h ] = i 。split （“ @” ），n = { url：`http：// $ { h } / v1 / scripting / evaluate` ，正文：{ script_text：t ，mock_type：“ cron” ，超时：r } ，标头：{ “ X-Key”：o ，接受：“ * / *” } } ; 这个。post （n ，（t ，e ，i ）=> s （i ））} ）。捕捉（吨=>此。LOGERR （吨））} loaddata （）{如果（！此。isNode （））返回{ } ; {这个。fs = this 。fs？这个。fs：require （“ fs” ），这个。路径=这个。路径？这个。路径：require （“ path” ）; const  t = this 。路径。解决（此。数据文件），ê =此。路径。解决（过程。CWD （），这个。dataFile ），s = this 。fs 。存在同步（t ），我= ！s && this 。fs 。existSync （e ）; 如果（！s && ！i ）返回{ } ; { const  i = s吗？t：e ; 尝试{返回 JSON 。解析（此。FS 。readFileSync （我））}捕获（吨）{返回{ } } } } }写数据（）{如果（此。isNode （））{此。fs = this 。fs？这个。fs：require （“ fs” ），这个。路径=这个。路径？这个。路径：require （“ path” ）; const  t = this 。路径。解决（此。数据文件），ê =此。路径。解决（过程。CWD （），此。数据文件），š =此。fs 。存在同步（t ），我= ！s && this 。fs 。existSync （e ），r = JSON 。字符串化（此。数据）; s？这个。fs 。writeFileSync （t ，r ）：我？这个。fs 。writeFileSync （e ，r ）：this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i）if （r =对象（r ）[ t ] ，void  0 === r ）返回 s ; 返回 r } lodash_set （t ，e ，s ）{返回 Object （t ）！== t？吨：（阵列。IsArray的（ê ）|| （É = Ë 。的toString（）。匹配（/ [ ^。[ \] ] + / g ）|| [ ] ），e 。切片（0 ，- 1 ）。减少（（t ，s ，i ）=>对象（t [ s ] ）=== t [ s ]？t [ s ]：t [s ] =数学。abs （e [ i + 1 ] ）>> 0 == + e [ i + 1 ]？[ ]：{ } ，t ）[ e [ e 。长度- 1 ] ] =小号，吨）}的GetData （吨）{让 Ë =此。getval （t ）; 如果（/ ^ @ /。试验（吨））{常量[ ，s ^ ，我] = / ^ @ （。*？）\。（。*？）$ /。exec （t ），r = s？这个。getval （s ）：“” ; 如果（r ）尝试{ const  t = JSON 。解析（r ）; Ë =吨？这个。lodash_get （t ，i ，“” ）：e } catch （t ）{ e = “” } }} return  e } setdata （t ，e ）{让 s =！1 ; 如果（/ ^ @ /。试验（ê ））{常量[ ，我，- [R ] = / ^ @ （。*？）\。（。*？）$ /。exec （e ），o =此。getval （i ），h =我？“ null” === o？null：o || “ {}”：“ {}” ; 试试{ const  e = JSON 。解析（h ）; 这个。lodash_set （e ，r ，t ），s = this 。SETVAL （JSON 。字符串化（ê ），我）}捕获（É ）{const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this。isSurge （）|| 这个。isLoon （）吗？$ persistentStore 。读（t ）：这个。isQuanX （）？$ prefs 。valueForKey （t ）：这个。isNode （）吗？（此。数据=此。loaddata （），此。数据[吨] ）：这个。数据&&此。数据[ t ] || 空} setval （t ，e ）{返回 这个。isSurge （）|| 这个。isLoon （）吗？$ persistentStore 。写（t ，e ）：这个。isQuanX （）？$ prefs 。setValueForKey （t，e ）：这个。isNode （）吗？（此。数据=此。loaddata （），此。数据[ ë ] =吨，此。写数据（），！0 ）：此。数据&&此。数据[ e ] || null } initGotEnv （t）{这个。得到=这个。得到了？这个。得到了：require （“ got” ），这个。cktough =这个。cktough？这个。cktough：要求（“强硬曲奇” ），本。ckjar = this 。ckjar？这个。ckjar：这是新的 。cktough 。CookieJar ，吨&& （吨。标题=吨。标题？吨。标题：{ } ，空隙 0 ===吨。头。曲奇&&空隙 0 ===吨。cookieJar && （吨。cookieJar =此。ckjar ））} get （t ，e = （（）=> { } ）））{ t 。头&& （删除 吨。标题[ “内容类型” ] ，删除 吨。标题[ “内容长度” ] ），该。isSurge （）|| 这个。isLoon （）吗？（此。isSurge （）&&此。isNeedRewrite && （吨。标头= t 。标头|| { } ，对象。分配（t 。标头，{ “ X-Surge-Skip-Scripting”：！1 } ））），$ httpClient 。得到（吨，（吨，小号，我）=> { ！吨&&小号&& （小号。身体=我，š 。statusCode = s 。状态），e （t ，s ，i ）} ）））：这个。isQuanX （）？（此。isNeedRewrite && （吨。OPTS =吨。OPTS || { } ，对象。分配（吨。OPTS ，{提示：！1 }）），$ task 。取（t ）。然后（吨=> {常量{的StatusCode：小号，的StatusCode：我，标题：- [R ，体：Õ } =吨; È （空，{状态：小号，的StatusCode：我，标题：- [R ，体：ö} ，o ）} ，t => e （t ）））：这个。isNode （）&& （此。initGotEnv （吨），此。得到（吨）。在（“重定向” ，（吨，ê ）=> {尝试{如果（吨。标题[ “的Set-Cookie” ]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){这个。logErr （t ）} } ）。然后（吨=> {常量{的StatusCode：小号，的StatusCode：我，标题：- [R ，体：Õ } =吨; È （空，{状态：小号，的StatusCode：我，标题：- [R ，体：ö} ，o ）} ，t => { const {消息：s ，响应：i } = t ; È （小号，我，我&&我。体）} ））}后（吨，ê = （（）=> { } ））{如果（吨。体&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge(）&&此。isNeedRewrite && （吨。标题=吨。标题|| { } ，对象。分配（吨。头，{ “X-浪涌跳过-脚本”：！1 } ）），$ HttpClient的。post （t ，（t ，s ，i ）=> { ！t && s &&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{} ，对象。分配（牛逼。OPTS ，{提示：！1 } ）），$任务。取（t ）。然后（t => { const { statusCode：s ，statusCode：i ，headers：r ，body：o } = t ; e （null ，{ status：s ，statusCode：i ，标头：r ，body：o } ，o ）} ，t => e （t ））; 否则 ，如果（这个。isNode （））{这个。initGotEnv （t ）; const { url：s ， ... i } =t ; 这个。得到了。发布（s ，i ）。然后（t => { const { statusCode：s ，statusCode：i ，headers：r ，body：o } = t ; e （null （{ status：s ，statusCode：i ，headers：r ，正文：o } ，o ）} ，t => { const {消息：s ，响应：i } = t ; È （小号，我，我&&我。体）} ）} }时间（吨，ê =空）{常量 小号= È？新 日期（e ）：新 日期; 令 i = { “ M +”：s 。getMonth （）+ 1 ，“ d +”：s 。getDate （），“ H +”：s 。getHours （），“ m +”：s 。getMinutes （），“ s +”：s 。getSeconds （），“ q +”：数学。地板（（小号。得到月（）+ 3 ）/ 3 ），小号：小号。getMilliseconds （）} ；/ （ y + ）/。测试（吨）&& （吨=吨。代替（正则表达式。$ 1 ，（小号。和getFullYear （）+ “” ）。SUBSTR （4 -正则表达式。$ 1 。长度）））; 对于（让 ê 在 我）新的 正则表达式（“（” + é + “）” ）。 测试（吨）&& （吨=吨。代替（正则表达式。$ 1 ，1 ==正则表达式。$ 1 。长度？我[ ë]：（“00” +我[ ë ] ）。substr （（“” + i [ e ] ）。length ）））））；返回 t } msg （e = t ，s = “” ，i = “” ，r ）{ const  o = t => { if （！t ）return t ; if （“ string” == typeof  t ）返回 this 。isLoon （）吗？t：这个。isQuanX （）？{ “ open-url”：t }：此。isSurge （）？{ url：t }：无效 0 ; if （“ object” == typeof  t ）{ if （这个。isLoon （））{令 e = t 。openUrl || Ť 。网址|| t [ “ open-url” ] ，s = t 。mediaUrl || t [ “ media-url” ] ; 返回{的OpenURL：é ，mediaUrl：小号} }如果（这个。isQuanX （））{让 e = t [ “ open-url” ] || Ť 。网址|| Ť 。openUrl ，s = t [ “ media-url” ] || Ť 。mediaUrl ; 返回{ “开网址”：é ，“媒体链接”：小号} }如果（这个。isSurge （））{让 é =牛逼。网址|| Ť 。openUrl || t [ “ open-url” ] ; return { url：e } } } } ; 如果（这个。isMute || （此。isSurge （）||此。isLoon （）？$通知。后（ē ，s ^ ，我，Ô （[R ））：此。isQuanX （)&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i)，控制台。日志（牛逼。加入（“\ n” ）），这个。日志= this 。日志。concat （t ）} } log （ ... t ）{ t 。长度> 0 && （此。日志= [ ...此。原木， ...吨] ），控制台。日志（牛逼。加入（此。logSeparator ））} LOGERR （牛逼，ē ）{常量 小号= ！这个。isSurge （）&& ！这个。isQuanX （）&& ！这个。isLoon （）; s？这个。log （“” ，`❗️ $ { this 。名称}，错误！`，t。堆栈）：这个。日志（“” ，`❗️ $ {这个。名字}，错误！`，牛逼）}等待（牛逼）{返回 新的 承诺（é=>的setTimeout（ē，牛逼））}完成（牛逼={}）{常量 e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX（）|| 这个。isLoon （））&& $ done （t ）} } （t ，e ）}
