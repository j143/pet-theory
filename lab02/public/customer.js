let user;

firebase.auth().onAuthStateChanged(function(newUser) {
    user = newUser;
    if (user) {
        const db = firebase.firestore();
        db.collection("customers").doc(user.email).onSnapshot(function(doc) {
            const cust = doc.data();
            if (cust) {
                document.getElementById('customerName').setAttribute('value', cust.name);
                document.getElementById('customerPhone').setAttribute('value', cust.phone);
            }
            document.getElementById('customerEmail').innerText = user.email;
        });
    }

});
