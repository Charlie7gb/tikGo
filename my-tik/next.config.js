/** @type {import('next').NextConfig} */


const nextConfig = {
	 webpack: (config) => {
    config.module.rules.push({
      test: /\.proto$/,
      use: [
        {
          loader: 'webpack-protobuf-loader',
        },
      ],
    });
    return config;
  },
    images: {
        domains: [

            'p9-sign-sg.tiktokcdn.com',
            'p9-sign-va.tiktokcdn.com',
            'p9-sign.tiktokcdn-us.com',
            'p9-webcast.tiktokcdn.com',
            'p9-sign-va-lite.tiktokcdn.com',
            'p9-pu-sign-ie.tiktokcdn-eu.com',
            'p9-sign-useast2a.tiktokcdn.com',
            'p9-pu-sign-useast8.tiktokcdn-us.com',

            'p16-sign-sg.tiktokcdn.com',
            'p16-sg.tiktokcdn.com',
            'p16-sign-va.tiktokcdn.com',
            'p16-sign.tiktokcdn-us.com',
            'p16-webcast.tiktokcdn.com',
            'p16-amd-va.tiktokcdn.com',
            'p16-pu-sign-ie.tiktokcdn-eu.com',
            'p16-sign-useast2a.tiktokcdn.com',
            'p16-pu-sign-useast8.tiktokcdn-us.com',

            'p19-sign-sg.tiktokcdn.com',
            'p19-sign-va.tiktokcdn.com',
            'p19-sign.tiktokcdn-us.com',
            'p19-webcast.tiktokcdn.com',
            'p19-pu-sign-ie.tiktokcdn-eu.com',
            'p19-sign-useast2a.tiktokcdn.com',
            'p19-pu-sign-useast8.tiktokcdn-us.com',
            
            'p77-sign-sg.tiktokcdn.com',
            'p77-sign-va.tiktokcdn.com',
            'p77-sign.tiktokcdn-us.com',
            'p77-webcast.tiktokcdn.com',
            'p77-sign-va-lite.tiktokcdn.com',
            'p77-pu-sign-ie.tiktokcdn-eu.com',
            'p77-sign-useast2a.tiktokcdn.com',
            'p77-pu-sign-useast8.tiktokcdn-us.com',

            'platform-lookaside.fbsbx.com',
            'lh3.googleusercontent.com', 
        ],
    }
}

module.exports = nextConfig
