module.exports = {
    home:'https://www.nike.com/kr/ko_kr/',
    //target:'https://www.nike.com/kr/launch/t/junior/fw/young-athletes/DC9561-400/ibtb94/nike-dunk-low-se-gs',
    target:'https://www.nike.com/kr/launch/t/women/fw/nike-sportswear/DO2154-010/sylq71/w-air-max-90-se',
    init:[

        //로그인
        {
            code:'document.querySelector(\'a[title="로그인"]\').click()',
            timeAfter:1000,
        },
        {
            code:"`document.getElementById('j_username').value='${id}';`",
        },
        {
            code:"`document.getElementById('j_password').value='${pass}';`",
        },
        {
            code:'document.querySelector(\'div.login_btn_line div button\').click()',
        },

    ],
    play:[

        //사이즈선택1
        {
            code:'document.querySelector("a.select-head").click()',
            timeAfter:500,
        },
        //사이즈선택2
        {
            code:`document.querySelector('ul.select-body li.list a[data-value="28"]').click()`
            //code:"`document.querySelector('#selectSize option[data-value=\"${size}\"]').click()`",
            //code:'for(let elem of document.querySelectorAll("#selectSize option")){ if(elem.disabled==\'disabled\') continue;  elem.click(); break; }' //any size
        },
        //바로구매
        {
            code:'document.querySelector("div.order-wrap a").click()',
            eventAfter:'did-finish-load',
        },
        //결제
        {
            code:'document.querySelector("div.footer div.uk-grid span button").click()',
            eventAfter:'did-finish-load',
        },
        //결제수단 - 카카오페이 선택
        {
            code:'document.querySelector("h6.payment-method-item-title").click()',
        },
        //주문 동의
        {
            code:`document.querySelector("label[for='isCheckoutAgree']").click()`,
            timeAfter:2000,
        },
        //결제하기
        {
            code:`document.querySelector('button[data-checkout-btn="payment"]').click()`,
            timeAfter:1000,
        },
        {
            code:`document.querySelector('button[data-checkout-btn="payment"]').click()`
        }

    ]
}