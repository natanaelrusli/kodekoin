import x from "../xendit";
const { Invoice: Invoice } = x,
    i = new Invoice({});

const createHistory = require("history").createBrowserHistory;

export const signUpHandler = (v, n, e, p, ph, s) => {
    v.preventDefault();
    axios
        .post("https://kodekoin.com/api/register", {
            name: n,
            email: e,
            phone: ph,
            password: p
        })
        .then(response => {
            console.log(response);
            if (response.data.status === 200) {
                s(response.data.message);
                console.log(response.data.message);
                setTimeout(() => {
                    s("");
                }, 5000);
                axios
                    .post("https://kodekoin.com/api/login", {
                        email: e,
                        password: p
                    })
                    .then(response => {
                        console.log(response.data.message);
                        if (response.data.status === 200) {
                            getInvoiceByEmail(e);
                            localStorage.setItem("isLoggedIn", true);
                            localStorage.setItem(
                                "userData",
                                JSON.stringify(response.data.data)
                            );
                            localStorage.setItem(
                                "token",
                                JSON.stringify(response.data.token)
                            );
                            s(response.data.message);
                            console.log(response.data.message);
                            setTimeout(() => {
                                s("");
                            }, 5000);
                        }

                        if (response.data.status === "failed") {
                            s(response.data.message);
                            console.log("aaaa", response.data.message);
                            setTimeout(() => {
                                s("");
                            }, 5000);
                        }
                    })
                    .catch(error => console.log(error));
            }

            if (response.data.status === "failed") {
                s(response.data.message);
                console.log(response.data.message);
                setTimeout(() => {
                    s("");
                }, 5000);
            }
        });
};

export const loginHandler = (v, e, p, m, s) => {
    v.preventDefault();
    axios
        .post("https://kodekoin.com/api/login", {
            email: e,
            password: p
        })
        .then(response => {
            console.log(response);
            if (response.data.status === 200) {
                localStorage.setItem(
                    "userData",
                    JSON.stringify(response.data.data)
                );
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.token)
                );
                m(response.data.message);
                console.log(response.data.message);
                getInvoiceByEmail(e);
                setTimeout(() => {
                    m("");
                    s(true);
                }, 8000);
            }

            if (response.data.status === "failed") {
                m(response.data.message);
                console.log(response.data.message);
                setTimeout(() => {
                    m("");
                }, 5000);
            }
        })
        .catch(error => console.log(error));
};

export const createOrder = async (
    name,
    email,
    phone,
    desc,
    price,
    method,
    paytype,
    proccess
) => {
    console.log(method, phone, price);
    if (paytype == 0) {
        virtualAccount(name, email, desc, price, method, paytype, proccess);
    } else if (paytype == 1) {
        eWallet(name, email, phone, desc, price, method, paytype, proccess);
    } else if (paytype == 2) {
        retailOutlet(
            name,
            email,
            phone,
            desc,
            price,
            method,
            paytype,
            proccess
        );
    } else if (paytype == 3) {
        qRis(name, email, desc, method, paytype, proccess);
    }
};

const eWallet = async (
    name,
    email,
    phone,
    desc,
    price,
    method,
    paytype,
    proccess
) => {
    const EWallet = x.EWallet;
    const ew = new EWallet({});
    const item = {
        id: Date.now().toString() + "-" + name + "-" + desc + "-" + method,
        name: desc,
        price: price,
        quantity: 1
    };
    await ew
        .createPayment({
            externalID:
                Date.now().toString() + "-" + name + "-" + desc + "-" + method,
            amount: price,
            phone: phone,
            items: [item, item],
            callbackURL: "https://kodekoin.com/api/ewalletcallback",
            redirectURL: "https://kodekoin.com",
            ewalletType: method
        })
        .then(e => {
            console.log("create payment detail:", e);
            storeEwallet(e);
            storeInvoiceEQ(e, name, email, desc, method, paytype, proccess);
        });

    // const retrievedPayment = await ew.getPayment({
    //     externalID: payment.external_id,
    //     ewalletType: payment.ewallet_type
    // });
    // // eslint-disable-next-line no-console
    // console.log("EWallet payment detail:", retrievedPayment);
};

const storeEwallet = async resp => {
    const business_id = resp.business_id ? resp.business_id : null;
    const status = resp.status ? resp.status : null;
    const phone = resp.phone ? resp.phone : null;
    await axios
        .post("https://kodekoin.com/api/ewallet", {
            external_id: resp.external_id,
            amount: resp.amount,
            checkout_url: resp.checkout_url,
            ewallet_type: resp.ewallet_type,
            business_id: resp.business_id,
            status: resp.status,
            phone: resp.phone
        })
        .then(e => {
            console.log("stored ewallet", e);
        });
};

const storeQrCode = async resp => {
    await axios
        .post("https://kodekoin.com/api/qris", {
            id_qr: resp.id,
            external_id: resp.external_id,
            amount: resp.amount,
            qr_string: resp.qr_string,
            callback_url: resp.callback_url,
            type: resp.type,
            status: resp.status
        })
        .then(e => {
            console.log("stored qr", e);
        });
};

const storeRetail = async resp => {
    await axios
        .post("https://kodekoin.com/api/retail", {
            is_single_use: resp.is_single_use,
            status: resp.status,
            owner_id: resp.owner_id,
            external_id: resp.external_id,
            retail_outlet_name: resp.retail_outlet_name,
            prefix: resp.prefix,
            name: resp.name,
            payment_code: resp.payment_code,
            type: resp.type,
            expected_amount: resp.expected_amount,
            expiration_date: resp.expiration_date,
            id_retail: resp.id
        })
        .then(e => {
            console.log("stored retail", e);
        });
};

const storeVirtual = async resp => {
    await axios
        .post("https://kodekoin.com/api/virtual", {
            is_closed: resp.is_closed,
            status: resp.status,
            currency: resp.currency,
            owner_id: resp.owner_id,
            external_id: resp.external_id,
            bank_code: resp.bank_code,
            merchant_code: resp.merchant_code,
            name: resp.name,
            account_number: resp.account_number,
            is_single_use: resp.is_single_use,
            id_va: resp.id
        })
        .then(e => {
            console.log("stored virtual", e);
        });
};

const virtualAccount = async (
    name,
    email,
    desc,
    price,
    method,
    paytype,
    proccess
) => {
    const VirtualAcc = x.VirtualAcc;
    const va = new VirtualAcc({});
    await va
        .createFixedVA({
            externalID:
                Date.now().toString() + "-" + name + "-" + desc + "-" + method,
            bankCode: method,
            name: name
            // suggestedAmt: price,
            // isClosed: !0,
            // expectedAmt: price
        })
        .then(e => {
            console.log("fixed va created:", e);
            storeVirtual(e);
            reqInvoice(name, email, desc, price, method, paytype, proccess);
        });

    // const { id } = fixedAcc;
    // const retrievedAcc = await va.getFixedVA({ id });
    // eslint-disable-next-line no-console
    // console.log('fixed va details:', retrievedAcc);
};

const retailOutlet = async (
    name,
    email,
    phone,
    desc,
    price,
    method,
    paytype,
    proccess
) => {
    const RetailOutlet = x.RetailOutlet;
    const ro = new RetailOutlet({});
    await ro
        .createFixedPaymentCode({
            externalID:
                Date.now().toString() + "-" + name + "-" + desc + "-" + method,
            retailOutletName: method,
            name: name,
            expectedAmt: price
        })
        .then(e => {
            console.log("fixed payment code created:", e);
            storeRetail(e);
            reqInvoice(name, email, desc, price, method, paytype, proccess);
        });

    // const { id } = pmCode;
    // const retrievedPmCode = await ro.getFixedPaymentCode({ id });
    // // eslint-disable-next-line no-console
    // console.log("fixed payment code details:", retrievedPmCode);

    // const updatedPmCode = await ro.updateFixedPaymentCode({
    //     id,
    //     expectedAmt: 12000
    // });
    // // eslint-disable-next-line no-console
    // console.log("updated payment code details:", updatedPmCode);
};

const qRis = async (name, email, desc, method, paytype, proccess) => {
    const { QrCode } = x;
    const q = new QrCode({});

    await q
        .createCode({
            externalID: Date.now().toString(),
            type: QrCode.Type.Dynamic,
            callbackURL: "https://kodekoin.com/qriscallback",
            amount: 10000
        })
        .then(e => {
            console.log("created QR code", e);
            storeQrCode(e);
            storeInvoiceEQ(e, name, email, desc, method, paytype, proccess);
        });

    // qrcode = await q.getCode({ externalID: qrcode.external_id });
    // console.log("retrieved QR code", qrcode);

    // const payment = await q.simulate({ externalID: qrcode.external_id });
    // console.log("simulated payment", payment);
};

const storeInvoiceVR = async (resp, m, proccess) => {
    await axios
        .post("https://kodekoin.com/api/invoice", {
            id_invoice: resp.id,
            id_user: resp.user_id,
            external_id: resp.external_id,
            email: resp.payer_email,
            amount: resp.amount,
            method: m,
            status: resp.status,
            description: resp.description,
            invoice_url: resp.invoice_url,
            expiry_date: resp.expiry_date
        })
        .then(e => {
            console.log("created invoice", e);
            proccess(false);
            createHistory().push("/dashboard");
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
        })
        .catch(e => console.log(e));
};

const storeInvoiceEQ = async (
    resp,
    name,
    email,
    desc,
    method,
    paytype,
    proccess
) => {
    proccess(true);
    const idin =
        paytype == 1 ? method + name + desc + Date.now().toString() : resp.id;
    const urin =
        paytype == 1
            ? method != "OVO"
                ? resp.checkout_url
                : method + name + desc + Date.now().toString()
            : resp.qr_string;
    const status = resp.status ? resp.status : "PENDING";
    console.log(
        idin,
        urin,
        name,
        email,
        desc,
        method,
        paytype,
        resp.external_id,
        resp.amount,
        status,
        Date.now().toString()
    );
    await axios
        .post("https://kodekoin.com/api/invoice", {
            id_invoice: idin,
            id_user: name,
            external_id: resp.external_id,
            email: email,
            amount: resp.amount,
            method: method,
            status: status,
            description: desc,
            invoice_url: urin,
            expiry_date: Date.now().toString()
        })
        .then(e => {
            console.log("created invoice", e);
            proccess(false);
            createHistory().push("/dashboard");
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
        })
        .catch(e => console.log(e));
};

const reqInvoice = async (
    name,
    email,
    desc,
    price,
    method,
    paytype,
    proccess
) => {
    proccess(true),
        await i
            .createInvoice({
                externalID:
                    Date.now().toString() +
                    "-" +
                    name +
                    "-" +
                    desc +
                    "-" +
                    method,
                payerEmail: email,
                description: desc,
                amount: price,
                shouldSendEmail: !1,
                paymentMethods: [method],
                successRedirectURL: "https://kodekoin.com",
                failureRedirectURL: "https://kodekoin.com"
            })
            .then(e => {
                storeInvoiceVR(e, method, proccess);
            })
            .catch(e => {
                p(false);
                console.log(e);
            });
};

const getInvoiceByEmail = async (e, l = undefined) => {
    console.log("getInvoiceByEmail"),
        await axios
            .get(`https://kodekoin.com/api/invhistory/${e}`)
            .then(
                e =>
                    200 === e.status &&
                    (localStorage.setItem("invoices", JSON.stringify(e.data)),
                    console.log("success retrieve invoice"),
                    localStorage.setItem("isLoggedIn", true),
                    l == undefined ? (l = undefined) : l(!1),
                    console.log(window.location.href),
                    "https://kodekoin.com/dashboard" !== window.location.href &&
                        (createHistory().push("/"),
                        (window.location.href = window.location.href)),
                    "failed" === e.data.status && console.log(e.data.message))
            )
            .catch(e => console.log(e));
};

export const updateInvoice = async (e, a, b) => {
    try {
        const o = await i.getAllInvoices({
            limit: 100
        });
        console.log(o);
        for (let a = 0; a < o.length; a++)
            for (let t = 0; t < e.length - 1; t++)
                o[a].id == e[t].id_invoice &&
                    axios
                        .put(`https://kodekoin.com/api/invoice/${e[t].id}`, {
                            status: o[a].status
                        })
                        .catch(e => console.log(e));
        getInvoiceByEmail(a, b);
    } catch (e) {
        console.error(e);
    }
};

export const cancelOrder = e => {
    i.expireInvoice({
        invoiceID: e
    }).then(e => {
        console.log("expired invoice", e);
        createHistory().push("/");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
        e;
    });
};

export const payOrder = e => {
    axios
        .get(`https://kodekoin.com/api/invoice/${e}`)
        .then(e => {
            console.log(e.data.invoice_url);
            createHistory().push(e.data.invoice_url);
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
        })
        .catch(e => console.log(e));
};

export const changePassHandler = (o, a, t, s) => {
    if (a == t && a != o) {
        axios
            .post("https://kodekoin.com/api/resetpass", {
                email: JSON.parse(localStorage.getItem("userData")).email,
                passold: o,
                passnew: a
            })
            .then(e => {
                console.log(e),
                    200 === e.data.status &&
                        (s(e.data.message),
                        console.log(e.data.message),
                        setTimeout(() => {
                            window.location.reload(!1);
                            s("");
                        }, 5e3)),
                    "failed" === e.data.status &&
                        (s(e.data.message),
                        console.log(e.data.message),
                        setTimeout(() => {
                            s("");
                        }, 5e3));
            })
            .catch(e => console.log(e));
    } else s("password doesn't match");
};

export const logoutHandler = () => {
    if ((localStorage.clear(), window.location.href.includes("dashboard"))) {
        console.log("Berhasil Logout"), createHistory().push("/login");
        let o = window.location.href;
        window.location.href = o;
    } else window.location.reload(!1);
};
