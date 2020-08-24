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

import x from "../xendit";
const { Invoice: Invoice } = x,
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

export const createInvoice = async (e, o, a, t, s, p) => {
    p(true),
        await i
            .createInvoice({
                externalID: Date.now().toString() + "+" + e + "+" + a,
                payerEmail: o,
                description: a,
                amount: t,
                shouldSendEmail: !1,
                paymentMethods: [s]
            })
            .then(e => {
                console.log(e),
                    axios
                        .post("http://localhost:8000/api/invoice", {
                            id_invoice: e.id,
                            id_user: e.user_id,
                            external_id: e.external_id,
                            email: e.payer_email,
                            amount: e.amount,
                            bank: e.available_banks[0]
                                ? e.available_banks[0].bank_code
                                : null,
                            ewallet: e.available_ewallets[0]
                                ? e.available_ewallets[0].ewallet_name
                                : null,
                            retail: e.available_retail_outlets
                                ? e.available_retail_outlets[0]
                                      .retail_outlet_name
                                : null,
                            status: e.status,
                            description: e.description,
                            invoice_url: e.invoice_url,
                            expiry_date: e.expiry_date
                        })
                        .then(e => {
                            console.log("created invoice", e);
                            p(false);
                            createHistory().push("/dashboard");
                            let pathUrl = window.location.href;
                            window.location.href = pathUrl;
                        })
                        .catch(e => console.log(e));
            })
            .catch(e => {
                p(false);
                console.log(e);
            });
};

export const getUserData = () => {};

const getInvoiceByEmail = async (e, l = undefined) => {
    console.log("sssss"),
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
        const o = await i.getAllInvoices({ limit: 100 });
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
    i.expireInvoice({ invoiceID: e }).then(e => {
        console.log("expired invoice", e);
        createHistory().push("/");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
        e;
    });
};
export const detailOrder = e => {};
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
