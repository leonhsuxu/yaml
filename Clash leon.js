/***
 * Clash Verge Rev 全局扩展脚本（懒人配置）/ Mihomo Party 覆写脚本
 * URL: https://github.com/dahaha-365/YaNet/
 */

/**
 * 整个脚本的总开关，在Mihomo Party使用的话，请保持为true
 * true = 启用
 * false = 禁用
 */
const enable = true

/**
 * 分流规则配置，会自动生成对应的策略组
 * 设置的时候可遵循“最小，可用”原则，把自己不需要的规则全禁用掉，提高效率
 * true = 启用
 * false = 禁用
 *
 * 已按要求：禁用 youtube、netflix、tiktok、spotify、WhatsApp、line、games、日本网站 等标签
 */
const ruleOptions = {
  apple: false, // 苹果服务
  microsoft: false, // 微软服务 (禁用)
  github: false, // Github服务
  google: false, // Google服务
  openai: false, // 国外AI和GPT
  spotify: false, // Spotify (已禁用)
  youtube: false, // YouTube (已禁用)
  bahamut: false, // 巴哈姆特/动画疯 (禁用)
  netflix: false, // Netflix网飞 (已禁用)
  tiktok: false, // 国际版抖音 (已禁用)
  disney: false, // 迪士尼 (禁用)
  pixiv: false, // Pixiv (禁用)
  hbo: false, // HBO (禁用)
  biliintl: false, // 哔哩哔哩东南亚 (禁用)
  tvb: false, // TVB (禁用)
  hulu: false, // Hulu (禁用)
  primevideo: false, // 亚马逊prime video (禁用)
  telegram: false, // Telegram通讯软件
  line: false, // Line (已禁用)
  whatsapp: false, // Whatsapp (已禁用)
  games: false, // 游戏策略组 (已禁用)
  japan: false, // 日本网站策略组 (已禁用)
  tracker: false, // 网络分析和跟踪服务
  ads: true, // 常见的广告
}

/**
 * 前置规则
 * 如果有需要前置的自定义规则，可以自行修改
 */
const rules = [
// Emby源地址，直连DIRECT
  'DOMAIN-SUFFIX,hohai.eu.org,DIRECT',
  'DOMAIN-SUFFIX,cerda.eu.org,DIRECT',
  'DOMAIN-SUFFIX,seraphine.eu.org,DIRECT',
  'DOMAIN-SUFFIX,kowo.eu.org,DIRECT',
  'DOMAIN-SUFFIX,libilibi.eu.org,DIRECT',
  'DOMAIN-SUFFIX,nouon.eu.org,DIRECT',
  'DOMAIN-SUFFIX,feiyue.lol,DIRECT',
  'DOMAIN-SUFFIX,aliz.work,DIRECT',
  'DOMAIN-SUFFIX,emos.lol,DIRECT',
  'DOMAIN-SUFFIX,bangumi.ca,DIRECT',
  'DOMAIN-SUFFIX,6666456.xyz,DIRECT',
  'DOMAIN-SUFFIX,191920.xyz,DIRECT',
  'DOMAIN-SUFFIX,nijigem.by,DIRECT',
  'DOMAIN-SUFFIX,ciallo.party,DIRECT',
  
// 其他规则，可按规则补充

]

/**
 * 地区配置，通过regex匹配代理节点名称
 * regex会有一定概率误判，自己调整一下吧
 * excludeHighPercentage是排除高倍率节点的开关，只对地区分组有效
 * 倍率大于regions里的ratioLimit值的代理节点会被排除
 *
 * NOTE:
 * 已将 英国/马来西亚/土耳其/加拿大/澳大利亚 移除到“其他节点”中（不会单独生成对应地区策略组）
 */
const regionOptions = {
  excludeHighPercentage: true,
  regions: [
    {
      name: 'HK香港',
      regex: /港|🇭🇰|hk|hongkong|hong kong/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png',
    },
    {
      name: 'US美国',
      regex: /(?!.*aus)(?=.*(美|🇺🇸|us(?!t)|usa|american|united states)).*/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png',
    },
    {
      name: 'JP日本',
      regex: /日本|🇯🇵|jp|japan/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png',
    },
    {
      name: 'KR韩国',
      regex: /韩|🇰🇷|kr|korea/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Korea.png',
    },
    {
      name: 'SG新加坡',
      regex: /新加坡|🇸🇬|sg|singapore/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png',
    },
    {
      name: 'CN中国大陆',
      regex: /中国|🇨🇳|cn|china/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China_Map.png',
    },
    {
      name: 'TW台湾省',
      regex: /台湾|🇹🇼|tw|taiwan|tai wan/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China.png',
    },
    {
      name: 'DE德国',
      regex: /德国|🇩🇪|de|germany/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Germany.png',
    },
    // 已移除: GB英国, MY马来西亚, TK土耳其, CA加拿大, AU澳大利亚
  ],
}

/**
 * 其实两组DNS就够了，一组国内，一组国外
 * defaultDNS是用来解析DNS的，必须为IP
 * DNS最好不要超过两个，从业界某知名APP的文档里学的
 */
const defaultDNS = ['tls://223.5.5.5']

const chinaDNS = ['119.29.29.29', '223.5.5.5']

const foreignDNS = ['https://120.53.53.53/dns-query', 'https://223.5.5.5/dns-query']

/**
 * DNS相关配置
 */
const dnsConfig = {
  enable: true,
  listen: ':1053',
  ipv6: true,
  'prefer-h3': true,
  'use-hosts': true,
  'use-system-hosts': true,
  'respect-rules': true,
  'enhanced-mode': 'fake-ip',
  'fake-ip-range': '198.18.0.1/16',
  'fake-ip-filter': ['*', '+.lan', '+.local', '+.market.xiaomi.com'],
  // 'default-nameserver': [...defaultDNS],
  nameserver: [...foreignDNS],
  'proxy-server-nameserver': [...foreignDNS],
  /**
   * 这里对域名解析进行分流
   * 由于默认dns是国外的了，只需要把国内ip和域名分流到国内dns
   */
  'nameserver-policy': {
    'geosite:private': 'system',
    'geosite:cn,steam@cn,category-games@cn,microsoft@cn,apple@cn': chinaDNS,
  },
}

// 规则集通用配置
const ruleProviderCommon = {
  type: 'http',
  format: 'yaml',
  interval: 86400,
}

// 代理组通用配置
const groupBaseOption = {
  interval: 300,
  timeout: 3000,
  url: 'http://cp.cloudflare.com/generate_204',
  lazy: true,
  'max-failed-times': 3,
  hidden: false,
}

const ruleProviders = new Map()
ruleProviders.set('applications', {
  ...ruleProviderCommon,
  behavior: 'classical',
  format: 'text',
  url: 'https://fastly.jsdelivr.net/gh/DustinWin/ruleset_geodata@clash-ruleset/applications.list',
  path: './ruleset/DustinWin/applications.list',
})

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0
  const proxyProviderCount =
    typeof config?.['proxy-providers'] === 'object'
      ? Object.keys(config['proxy-providers']).length
      : 0
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error('配置文件中未找到任何代理')
  }

  let regionProxyGroups = []
  let otherProxyGroups = config.proxies.map((b) => {
    return b.name
  })

  config['allow-lan'] = true

  config['bind-address'] = '*'

  config['mode'] = 'rule'

  // 覆盖原配置中DNS配置
  config['dns'] = dnsConfig

  config['profile'] = {
    'store-selected': true,
    'store-fake-ip': true,
  }

  config['unified-delay'] = true

  config['tcp-concurrent'] = true

  /**
   * 这个值设置大点能省电，笔记本和手机需要关注一下
   */
  config['keep-alive-interval'] = 1800

  config['find-process-mode'] = 'strict'

  config['geodata-mode'] = true

  /**
   * 适合小内存环境，如果在旁路由里运行可以改成standard
   */
  config['geodata-loader'] = 'memconservative'

  config['geo-auto-update'] = true

  config['geo-update-interval'] = 24

  /**
   * 不开域名嗅探的话，日志里只会记录请求的ip，对查找问题不方便
   * override-destination默认值是true，但是个人建议全局设为false，否则某些应用会出现莫名其妙的问题
   * Mijia Cloud跳过是网上抄的
   */
  config['sniffer'] = {
    enable: true,
    'force-dns-mapping': true,
    'parse-pure-ip': false,
    'override-destination': true,
    sniff: {
      TLS: {
        ports: [443, 8443],
      },
      HTTP: {
        ports: [80, '8080-8880'],
      },
      QUIC: {
        ports: [443, 8443],
      },
    },
    'skip-src-address': [
      '127.0.0.0/8',
      '192.168.0.0/16',
      '10.0.0.0/8',
      '172.16.0.0/12',
    ],
    'force-domain': [
      '+.google.com',
      '+.googleapis.com',
      '+.googleusercontent.com',
      '+.youtube.com',
      '+.facebook.com',
      '+.messenger.com',
      '+.fbcdn.net',
      'fbcdn-a.akamaihd.net',
    ],
    'skip-domain': ['Mijia Cloud', '+.oray.com'],
  }

  /**
   * write-to-system如果设为true的话，有可能出现电脑时间不对的问题
   */
  config['ntp'] = {
    enable: true,
    'write-to-system': false,
    server: 'cn.ntp.org.cn',
  }

  config['geox-url'] = {
    geoip:
      'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat',
    geosite:
      'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat',
    mmdb: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb',
    asn: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb',
  }

  /**
   * 总开关关闭时不处理策略组
   */
  if (!enable) {
    return config
  }

  regionOptions.regions.forEach((region) => {
    /**
     * 提取倍率符合要求的代理节点
     * 判断倍率有问题的话，大概率是这个正则的问题，可以自行修改
     * 自己改正则的话记得必须把倍率的number值提取出来
     */
    let proxies = config.proxies
      .filter((a) => {
        const multiplier =
          /(?<=[xX✕✖⨉倍率])([1-9]+(\.\d+)*|0{1}\.\d+)(?=[xX✕✖⨉倍率])*/i.exec(
            a.name
          )?.[1]
        return (
          a.name.match(region.regex) &&
          parseFloat(multiplier || '0') <= region.ratioLimit
        )
      })
      .map((b) => {
        return b.name
      })

    /**
     * 必须再判断一下有没有符合要求的代理节点
     * 没有的话，这个策略组就不应该存在
     * 我喜欢自动选择延迟最低的节点，喜欢轮询的可以自己修改
     */
    if (proxies.length > 0) {
      regionProxyGroups.push({
        ...groupBaseOption,
        name: region.name,
        type: 'url-test',
        tolerance: 50,
        icon: region.icon,
        proxies: proxies,
      })
    }

    otherProxyGroups = otherProxyGroups.filter((x) => !proxies.includes(x))
  })

  const proxyGroupsRegionNames = regionProxyGroups.map((value) => {
    return value.name
  })

  if (otherProxyGroups.length > 0) {
    proxyGroupsRegionNames.push('其他节点')
  }

  // 更改：默认节点名称改为 "节点选择"，并在其中增加 "自动选择"、"故障转移"、"负载均衡" 选项
  config['proxy-groups'] = [
    {
      ...groupBaseOption,
      name: '节点选择',
      type: 'select',
      // 在选项中增加 "自动选择"、"故障转移" 和 "负载均衡"（需下面创建对应的策略组），并保留地区组与直连
      proxies: ['自动选择', '故障转移', '负载均衡', ...proxyGroupsRegionNames, '直连'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png',
    },
  ]

  // 新增：自动选择 策略组（用于“节点选择”中的自动选择项）
  config['proxy-groups'].push({
    ...groupBaseOption,
    name: '♻️ 自动选择',
    type: 'url-test',
    tolerance: 50,
    // 自动选择会测试所有地区组与直连
    proxies: [...proxyGroupsRegionNames, '直连'],
    })

  // 新增：故障转移（fallback）策略组，用于主节点异常时自动切换到后备节点
  config['proxy-groups'].push({
    ...groupBaseOption,
    name: '🔄 故障转移',
    type: 'fallback',
    // fallback通常按顺序尝试，这里将地区组与直连放在列表中，优先顺序可按需要调整
    proxies: [...proxyGroupsRegionNames, '直连'],
    url: 'http://cp.cloudflare.com/generate_204',
  })

  // 新增：负载均衡（load-balance）策略组，用于轮询/加权分配流量
  config['proxy-groups'].push({
    ...groupBaseOption,
    name: '⚖️ 负载均衡',
    type: 'load-balance',
    // strategy/策略字段有不同实现，这里使用常见的 round-robin 值作为示例
    strategy: 'round-robin',
    tolerance: 200,
    proxies: [...proxyGroupsRegionNames, '直连'],
    icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Load_Balance.png',
  })

  config.proxies = config?.proxies || []
  config.proxies.push({
    name: '直连',
    type: 'direct',
    udp: true,
  })

  if (ruleOptions.openai) {
    rules.push(
      'DOMAIN-SUFFIX,grazie.ai,国外AI',
      'DOMAIN-SUFFIX,grazie.aws.intellij.net,国外AI',
      'RULE-SET,ai,国外AI',
    )
    ruleProviders.set('ai', {
      ...ruleProviderCommon,
      behavior: 'classical',
      format: 'text',
      url: 'https://github.com/dahaha-365/YaNet/raw/refs/heads/dist/rulesets/mihomo/ai.list',
      path: './ruleset/YaNet/ai.list',
    })
    // 隐藏国外AI策略组（不在代理组列表直接显示）
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: '国外AI',
      type: 'select',
      proxies: ['自动选择', ...proxyGroupsRegionNames, '直连'],
      url: 'https://chat.openai.com/cdn-cgi/trace',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png',
      hidden: true,
    })
  }

  if (ruleOptions.youtube) {
    rules.push('GEOSITE,youtube,YouTube')
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: 'YouTube',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'https://www.youtube.com/s/desktop/494dd881/img/favicon.ico',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png',
    })
  }

  // if (ruleOptions.biliintl) {
  //   rules.push('GEOSITE,biliintl,哔哩哔哩东南亚')
  //   config['proxy-groups'].push({
  //     ...groupBaseOption,
  //     name: '哔哩哔哩东南亚',
  //     type: 'select',
  //     proxies: ['默认节点', '直连', ...proxyGroupsRegionNames],
  //     url: 'https://www.bilibili.tv/',
  //     icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/bilibili_3.png',
  //   })
  // }

  // if (ruleOptions.bahamut) {
  //   rules.push('GEOSITE,bahamut,巴哈姆特')
  //   config['proxy-groups'].push({
  //     ...groupBaseOption,
  //     name: '巴哈姆特',
  //     type: 'select',
  //     proxies: ['默认节点', '直连', ...proxyGroupsRegionNames],
  //     url: 'https://ani.gamer.com.tw/ajax/getdeviceid.php',
  //     icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Bahamut.png',
  //   })
  // }

  // if (ruleOptions.disney) {
  //   rules.push('GEOSITE,disney,Disney+')
  //   config['proxy-groups'].push({
  //     ...groupBaseOption,
  //     name: 'Disney+',
  //     type: 'select',
  //     proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
  //     url: 'https://disney.api.edge.bamgrid.com/devices',
  //     icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Disney+.png',
  //   })
  // }

  if (ruleOptions.netflix) {
    rules.push('GEOSITE,netflix,NETFLIX')
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: 'NETFLIX',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'https://api.fast.com/netflix/speedtest/v2?https=true',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Netflix.png',
    })
  }

  if (ruleOptions.tiktok) {
    rules.push('GEOSITE,tiktok,Tiktok')
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: 'Tiktok',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'https://www.tiktok.com/',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TikTok.png',
    })
  }

  if (ruleOptions.spotify) {
    rules.push('GEOSITE,spotify,Spotify')
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: 'Spotify',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'http://spclient.wg.spotify.com/signup/public/v1/account',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Spotify.png',
    })
  }

  // if (ruleOptions.pixiv) {
  //   rules.push('GEOSITE,pixiv,Pixiv')
  //   config['proxy-groups'].push({
  //     ...groupBaseOption,
  //     name: 'Pixiv',
  //     type: 'select',
  //     proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
  //     url: 'http://spclient.wg.spotify.com/signup/public/v1/account',
  //     icon: 'https://play-lh.googleusercontent.com/8pFuLOHF62ADcN0ISUAyEueA5G8IF49mX_6Az6pQNtokNVHxIVbS1L2NM62H-k02rLM=w240-h480-rw',
  //   })
  // }

  // if (ruleOptions.hbo) {
  //   rules.push('GEOSITE,hbo,HBO')
  //   config['proxy-groups'].push({
  //     ...groupBaseOption,
  //     name: 'HBO',
  //     type: 'select',
  //     proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
  //     url: 'https://www.hbo.com/favicon.ico',
  //     icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/HBO.png',
  //   })
  // }

  // if (ruleOptions.tvb) {
  //   rules.push('GEOSITE,tvb,TVB')
  //   config['proxy-groups'].push({
  //     ...groupBaseOption,
  //     name: 'TVB',
  //     type: 'select',
  //     proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
  //     url: 'https://www.tvb.com/logo_b.svg',
  //     icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TVB.png',
  //   })
  // }

  // if (ruleOptions.primevideo) {
  //   rules.push('GEOSITE,primevideo,Prime Video')
  //   config['proxy-groups'].push({
  //     ...groupBaseOption,
  //     name: 'Prime Video',
  //     type: 'select',
  //     proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
  //     url: 'https://m.media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png',
  //     icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Prime_Video.png',
  //   })
  // }

  // if (ruleOptions.hulu) {
  //   rules.push('GEOSITE,hulu,Hulu')
  //   config['proxy-groups'].push({
  //     ...groupBaseOption,
  //     name: 'Hulu',
  //     type: 'select',
  //     proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
  //     url: 'https://auth.hulu.com/v4/web/password/authenticate',
  //     icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hulu.png',
  //   })
  // }

  if (ruleOptions.telegram) {
    rules.push('GEOIP,telegram,Telegram')
    // 隐藏 Telegram 策略组（不在代理组列表直接显示）
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: 'Telegram',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'http://www.telegram.org/img/website_icon.svg',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Telegram.png',
      hidden: true,
    })
  }

  if (ruleOptions.whatsapp) {
    rules.push('GEOSITE,whatsapp,WhatsApp')
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: 'WhatsApp',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'https://web.whatsapp.com/data/manifest.json',
      icon: 'https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png',
    })
  }

  if (ruleOptions.line) {
    rules.push('GEOSITE,line,Line')
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: 'Line',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'https://line.me/page-data/app-data.json',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Line.png',
    })
  }

  if (ruleOptions.games) {
    rules.push(
      'GEOSITE,category-games@cn,国内网站',
      'GEOSITE,category-games,游戏专用'
    )
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: '游戏专用',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Game.png',
    })
  }

  if (ruleOptions.tracker) {
    rules.push('GEOSITE,tracker,跟踪分析')
    // 隐藏 跟踪分析 策略组
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: '跟踪分析',
      type: 'select',
      proxies: ['REJECT', '直连', '节点选择'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Reject.png',
      hidden: true,
    })
  }

  if (ruleOptions.ads) {
    rules.push('GEOSITE,category-ads-all,广告过滤')
    rules.push('RULE-SET,adblockmihomo,广告过滤')
    ruleProviders.set('adblockmihomo', {
      ...ruleProviderCommon,
      behavior: 'domain',
      format: 'mrs',
      url: 'https://github.com/217heidai/adblockfilters/raw/refs/heads/main/rules/adblockmihomo.mrs',
      path: './ruleset/adblockfilters/adblockmihomo.mrs',
    })
    // 隐藏 广告过滤 策略组
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: '广告过滤',
      type: 'select',
      proxies: ['REJECT', '直连', '节点选择'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Advertising.png',
      hidden: true,
    })
  }

  if (ruleOptions.apple) {
    rules.push('GEOSITE,apple-cn,苹果服务')
    // 隐藏 苹果服务 策略组
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: '苹果服务',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'http://www.apple.com/library/test/success.html',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Apple_2.png',
      hidden: true,
    })
  }

  if (ruleOptions.google) {
    rules.push('GEOSITE,google,谷歌服务')
    // 隐藏 谷歌服务 策略组
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: '谷歌服务',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'http://www.google.com/generate_204',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Google_Search.png',
      hidden: true,
    })
  }

  if (ruleOptions.github) {
    rules.push('GEOSITE,github,Github')
    // 隐藏 Github 策略组
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: 'Github',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'https://github.com/robots.txt',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/GitHub.png',
      hidden: true,
    })
  }

  // if (ruleOptions.microsoft) {
  //   rules.push('GEOSITE,microsoft@cn,国内网站', 'GEOSITE,microsoft,微软服务')
  //   config['proxy-groups'].push({
  //     ...groupBaseOption,
  //     name: '微软服务',
  //     type: 'select',
  //     proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
  //     url: 'http://www.msftconnecttest.com/connecttest.txt',
  //     icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Microsoft.png',
  //   })
  // }

  if (ruleOptions.japan) {
    rules.push(
      'RULE-SET,category-bank-jp,日本网站',
      'GEOIP,jp,日本网站,no-resolve'
    )
    ruleProviders.set('category-bank-jp', {
      ...ruleProviderCommon,
      behavior: 'domain',
      format: 'mrs',
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-bank-jp.mrs',
      path: './ruleset/MetaCubeX/category-bank-jp.mrs',
    })
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: '日本网站',
      type: 'select',
      proxies: ['节点选择', ...proxyGroupsRegionNames, '直连'],
      url: 'https://r.r10s.jp/com/img/home/logo/touch.png',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/JP.png',
    })
  }

  rules.push(
    'GEOSITE,private,DIRECT',
    'GEOIP,private,DIRECT,no-resolve',
    'GEOSITE,cn,国内网站',
    'GEOIP,cn,国内网站,no-resolve',
    'MATCH,其他外网'
  )
  // 隐藏以下策略组（不在代理组侧栏直接显示）
  config['proxy-groups'].push(
    {
      ...groupBaseOption,
      name: '下载软件',
      type: 'select',
      proxies: [
        '直连',
        'REJECT',
        '节点选择',
        '国内网站',
        ...proxyGroupsRegionNames,
      ],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Download.png',
      hidden: true,
    },
    {
      ...groupBaseOption,
      name: '其他外网',
      type: 'select',
      proxies: ['节点选择', '国内网站', ...proxyGroupsRegionNames],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Streaming!CN.png',
      hidden: true,
    },
    {
      ...groupBaseOption,
      name: '国内网站',
      type: 'select',
      proxies: ['直连', '节点选择', ...proxyGroupsRegionNames],
      url: 'http://wifi.vivo.com.cn/generate_204',
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/StreamingCN.png',
      hidden: true,
    }
  )

  config['proxy-groups'] = config['proxy-groups'].concat(regionProxyGroups)

  // 覆盖原配置中的规则
  config['rules'] = rules
  config['rule-providers'] = Object.fromEntries(ruleProviders)

  if (otherProxyGroups.length > 0) {
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: '其他节点',
      type: 'select',
      proxies: otherProxyGroups,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/World_Map.png',
    })
  }

  // 返回修改后的配置
  return config
}
