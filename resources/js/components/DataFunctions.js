// import x from "../xendit";

// const { Invoice } = x;
// const i = new Invoice({});

// export const createInvoice = async (name, email, desc, price, method) => {
//     const createHistory = require("history").createBrowserHistory;
//     let history = createHistory();
//     let invoice = await i
//         .createInvoice({
//             externalID: Date.now().toString() + "+" + name + "+" + desc,
//             payerEmail: email,
//             description: desc,
//             amount: price,
//             shouldSendEmail: true,
//             paymentMethods: [method]
//         })
//         .then(response => {
//             console.log(response);
//             axios
//                 .post("http://localhost:8000/api/invoice", {
//                     id_invoice: response.id,
//                     id_user: response.user_id,
//                     external_id: response.external_id,
//                     email: response.payer_email,
//                     amount: response.amount,
//                     bank: response.available_banks.bank_code,
//                     status: response.status,
//                     description: response.description,
//                     invoice_url: response.invoice_url,
//                     expiry_date: response.expiry_date
//                 })
//                 .then(response => {
//                     console.log("created invoice", response);
//                 })
//                 .catch(error => console.log(error));
//         });
//     // history.push("/dashboard");
//     // let pathUrl = window.location.href;
//     // window.location.href = pathUrl;
// };

// export const getUserData = () => {};
// export const getInvoiceByEmail = (email, loading) => {
//     axios
//         .get(`http://localhost:8000/api/invhistory/${email}`)
//         .then(res => {
//             if (res.status === 200) {
//                 localStorage.setItem("invoices", JSON.stringify(res.data));
//                 console.log("success retrieve invoice");
//                 loading(false);
//             }
//             // console.log("testing DataFunction");

//             if (res.data.status === "failed") {
//                 console.log(res.data.message);
//             }
//         })
//         .catch(error => console.log(error));
// };
// export const updateInvoice = async invoices => {
//     try {
//         const retrievedInvoice = await i.getAllInvoices();
//         // console.log("all ", retrievedInvoice);
//         for (let index = 0; index < retrievedInvoice.length; index++) {
//             for (let y = 0; y < invoices.length - 1; y++) {
//                 // console.log("nih", invoices[y]);
//                 if (retrievedInvoice[index].id == invoices[y].id_invoice) {
//                     axios
//                         .put(
//                             `http://localhost:8000/api/invoice/${invoices[y].id}`,
//                             {
//                                 status: retrievedInvoice[index].status
//                             }
//                         )
//                         // .then(response => {
//                         //     console.log("testing" + y);
//                         //     console.log(response);
//                         // })
//                         .catch(error => console.log(error));
//                 }
//             }
//         }
//     } catch (e) {
//         console.error(e);
//     }
// };
// export const cancelOrder = (id, proccess) => {
//     proccess(false);
//     i.expireInvoice({ invoiceID: id }).then(response => {
//         window.location.reload(false);
//         console.log("expired invoice", r);
//         return response;
//     });
// };
// export const changePassHandler = (
//     dbPass,
//     oldPass,
//     newPass,
//     confPass,
//     setMessage
// ) => {
//     if (oldPass == dbPass) {
//         console.log("tahap 1 ok");
//         if (newPass == dbPass) {
//             console.log("pass tidak boleh sama seperti sebelumnya");
//             setMessage("pass tidak boleh sama seperti sebelumnya");
//         } else {
//             if (newPass == confPass) {
//                 console.log("pass ok");
//                 // call update function changepass
//                 axios
//                     .post("http://localhost:8000/api/resetpass", {
//                         email: sessionStorage.data, //get email from session
//                         password: newPass
//                     })
//                     .then(response => {
//                         console.log(response);
//                         if (response.data.status === 200) {
//                             // setredirect(true);
//                             // ganti password berhasil
//                             setMessage(response.data.message);
//                             console.log(response.data.message);
//                             setTimeout(() => {
//                                 setMessage("");
//                             }, 5000);
//                         }

//                         if (response.data.status === "failed") {
//                             setMessage(response.data.message);
//                             console.log(response.data.message);
//                             setTimeout(() => {
//                                 setMessage("");
//                             }, 5000);
//                         }
//                     })
//                     .catch(error => console.log(error));
//             } else {
//                 console.log("pass tidak sama");
//                 setMessage("pass tidak sama");
//             }
//         }
//     } else {
//         console.log("pass lama tidak sama");
//         setMessage("pass lama tidak sama");
//     }
// };
import QRCode from "qrcode";
import x from "../xendit";
import {
    method
} from "lodash";
const {
    Invoice: Invoice
} = x,
i = new Invoice({});

const createHistory = require("history").createBrowserHistory;

export const signUpHandler = (v, n, e, p, ph, s) => {
    v.preventDefault();
    axios
        .post("http://localhost:8000/api/signup", {
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
                    .post("http://localhost:8000/api/login", {
                        email: e,
                        password: p
                    })
                    .then(response => {
                        console.log(response);
                        if (response.data.status === 200) {
                            getInvoiceByEmail(e);
                            localStorage.setItem("isLoggedIn", true);
                            localStorage.setItem(
                                "userData",
                                JSON.stringify(response.data.data)
                            );
                            s(response.data.message);
                            console.log(response.data.message);
                            setTimeout(() => {
                                s("");
                            }, 5000);
                            createHistory().push("/");
                            let pathUrl = window.location.href;
                            window.location.href = pathUrl;
                        }

                        if (response.data.status === "failed") {
                            s(response.data.message);
                            console.log(response.data.message);
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
        .post("http://localhost:8000/api/login", {
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
                m(response.data.message);
                console.log(response.data.message);
                getInvoiceByEmail(e);
                setTimeout(() => {
                    localStorage.setItem("isLoggedIn", true);
                    s(true);
                    m("");
                }, 5000);
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
            externalID: Date.now().toString() + "-" + name + "-" + desc + "-" + method,
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

const storeEwallet = async resp => {
    const business_id = resp.business_id ? resp.business_id : null;
    const status = resp.status ? resp.status : null;
    const phone = resp.phone ? resp.phone : null;
    await axios
        .post("http://localhost:8000/api/ewallet", {
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
        .post("http://localhost:8000/api/qris", {
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
        .post("http://localhost:8000/api/retail", {
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
        .post("http://localhost:8000/api/virtual", {
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
            externalID: Date.now().toString() + "-" + name + "-" + desc + "-" + method,
            amount: price,
            phone: "089911111111",
            items: [item, item],
            callbackURL: "http://kodekoin.com",
            redirectURL: "http://kodekoin.com",
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
            externalID: Date.now().toString() + "-" + name + "-" + desc + "-" + method,
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
    const {
        QrCode
    } = x;
    const q = new QrCode({});

    await q
        .createCode({
            externalID: Date.now().toString(),
            type: QrCode.Type.Dynamic,
            callbackURL: "http://kodekoin.com",
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
    // QRCode.toString(qrcode.qr_string, { type: "terminal" }, function(err, url) {
    //     console.log(url);
    // });
    // const generateQR = async text => {
    //     try {
    //         console.log(await QRCode.toDataURL(text));
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    // console.log(generateQR(qrcode.qr_string));
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

const storeInvoiceVR = async (resp, m, proccess) => {
    await axios
        .post("http://localhost:8000/api/invoice", {
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
        paytype == 1 ?
        method != "OVO" ?
        resp.checkout_url :
        method + name + desc + Date.now().toString() :
        resp.qr_string;
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
        .post("http://localhost:8000/api/invoice", {
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
            // createHistory().push("/dashboard");
            // let pathUrl = window.location.href;
            // window.location.href = pathUrl;
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
            externalID: Date.now().toString() +
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
            successRedirectURL: "http://kodekoin.com",
            failureRedirectURL: "http://kodekoin.com"
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
        .get(`http://localhost:8000/api/invhistory/${e}`)
        .then(
            e =>
            200 === e.status &&
            (localStorage.setItem("invoices", JSON.stringify(e.data)),
                console.log("success retrieve invoice"),
                l == undefined ? (l = undefined) : l(!1),
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
                .put(`http://localhost:8000/api/invoice/${e[t].id}`, {
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
        .get(`http://localhost:8000/api/invoice/${e}`)
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
            .post("http://localhost:8000/api/resetpass", {
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
        console.log("Berhasil Logout"), createHistory().push("/");
        let o = window.location.href;
        window.location.href = o;
    } else window.location.reload(!1);
};
