import { initializeApp } from 'firebase/app';
import { initializeFirestore, doc, getDoc, getDocFromServer, CACHE_SIZE_UNLIMITED, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize Firestore with settings to improve connectivity in restricted environments
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
}, firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)' 
  ? firebaseConfig.firestoreDatabaseId 
  : undefined);

// Enable persistence for better offline handling
if (typeof window !== 'undefined') {
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: multiple tabs.');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence unsupported.');
    }
  });
}

// Connectivity check with informative logging
async function testConnection() {
  try {
    // Only attempt to reach the server once on startup to check database existence
    // We use getDocFromServer to bypass cache and force a network round-trip.
    const testDoc = doc(db, '_connectivity_test_', 'ping');
    // Using getDoc is safer than getDocFromServer as it handles offline via cache if needed
    await getDoc(testDoc);
    console.log("Firebase: Connection established.");
  } catch (error: any) {
    if (error.code === 'unavailable' || error.message?.includes('offline')) {
      // Completely silent on offline/connectivity issues during startup boot check
      return;
    } else if (error.code === 'permission-denied') {
      console.log("Firebase: Connected, but access was denied (this is normal for a ping if rules are restrictive).");
    } else {
      console.debug("Firebase connection diagnostic:", error.code || error.name, error.message);
    }
  }
}

testConnection();
