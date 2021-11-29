module.exports = {
    home:'https://www.nike.com/kr/ko_kr/t/men/fw/basketball/DC6515-100/wpei95/air-jordan-1-retro-high-og',
    init:[

        //로그인
        {
            code:'document.querySelector(\'a[title="로그인"]\').click()',
            timeAfter:1000,
        },
        {
            code:'document.getElementById("j_username").value="goju2k";',
        },
        {
            code:'document.getElementById("j_password").value="rhwndud22@@";',
        },
        {
            code:'document.querySelector(\'div.login_btn_line div button\').click()',
        },

    ],
    play:[

        //사이즈선택
        {
            code:'document.querySelector(\'span.input-radio[typename="260"] input\').click()',
        },
        //바로구매
        {
            code:'document.querySelector("div.order-wrap a").click()',
            eventAfter:'did-finish-load',
        },
        //결제
        {
            code:'document.querySelector("div.footer div.uk-grid span button").click()',
        }

    ]
}