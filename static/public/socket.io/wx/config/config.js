const config = {}

config.appletName = 'mp_link_guess'

config.env = {
  dev: {
    DOMAIN: 'https://mp.langjie.com',
    crmBaseUrl:"https://wx.langjie.com",
    oncegame_host: "https://wx.langjie.com/mingdev",
    plcmcontrollerHost:"https://plcmcontroller.langjie.com"
  },
  pro: {
    DOMAIN: 'https://mp.langjie.com',
    crmBaseUrl:"https://wx.langjie.com",
    oncegame_host: "https://wx.langjie.com/mingdev",
    plcmcontrollerHost:"https://plcmcontroller.langjie.com"
  }
}

export default {
  ...config.env.dev,
  ...config
}