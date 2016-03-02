var Firebase = require('firebase');
var moment = require('moment');
// valos a restar en segundos
var fourDays = 100000; //350000; //4 dias en segundos
var currentTimeStamp = moment().unix(); //en segundos

var beforeFourdays = (currentTimeStamp - fourDays) * 1000; //4 dias atras en milisegundos;
var rootRef = new Firebase('https://k-exitos.firebaseio.com/');
var inspeccionesRef = rootRef.child('inspecciones');
var beforeFourdaysRef = inspeccionesRef.orderByChild('timestamp').endAt(beforeFourdays);
var fotosByInspeccionRef = rootRef.child('fotosByInspeccion');
beforeFourdaysRef.on('child_added', onAdd)


function onAdd(childSnap) {
    var key = childSnap.key()
    console.log(childSnap.key(), childSnap.val())

    // removefotos
    fotosByInspeccionRef.child(key).remove()

    //remove inspeccion

    childSnap.ref().remove();
}
