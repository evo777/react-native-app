import firebase from 'firebase';
import firebaseApp from './firebaseConfig';
import store from '../store';
import updateHelpees from '../actions/updateHelpees';

function getRef() {
  return firebaseApp.database().ref().child('helpie');
}

const helpees = getRef();

function listenForItems(cb) {
  helpees.on('value', update => {
    var helpeesArr = [];
    update.forEach((item) => {
      helpeesArr.push(item.val());
    })
   return cb(helpeesArr);
  });
}

function updateStoreWithHelpees (helpees) {
  store.dispatch(updateHelpees(helpees));
}

function _addHelpie(latitude, longitude){
  helpees.push({
    latitude: store.getState().locationState.get('lat'),
    longitude: store.getState().locationState.get('long'),
    createdAt: Date.now(),
    title: store.getState().userState.get('name')
  })
}

listenForItems(updateStoreWithHelpees);

export default _addHelpie;





// constructor(props){
  //   super(props);
  //   this.itemsRef = this.getRef().child('helpie');
  // }

  // getRef() {
  //   return firebaseApp.database().ref();
  // }

  // listenForItems(itemsRef) {
  //   itemsRef.on('value', (snap) => {
  //     var helpie = [];
  //     snap.forEach((child) => {
  //       helpie.push({
  //         latitude: child.val().latitude,
  //         longitude: child.val().longitude,
  //         name: child.val().name,
  //         _key: child.key
  //       });
  //     });
  //   });
  // }

  // componentDidMount() {
  //   this.listenForItems(this.itemsRef);
  // }

