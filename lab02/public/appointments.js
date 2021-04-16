let user;

firebase.auth().onAuthStateChanged(function(newUser) {
  user = newUser;
  if (user) {
    const db = firebase.firestore();
    const appColl = db.collection('customers').doc(user.email).collection('appointments');
    appColl.orderBy('time').onSnapshot(function(snapshot) {
      const div = document.getElementById('appointments');
      div.innerHTML = '';
      snapshot.docs.forEach(appointment => {
        div.innerHTML += formatDate(appointment.data().time) + '<br/>';
      })
      if (div.innerHTML == '') {
        div.innerHTML = 'No appointments scheduled';
      }
    });
  }
});
