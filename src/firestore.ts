import { Firestore } from "@google-cloud/firestore";

// Create a new client
const firestore = new Firestore({
  projectId: "comite-oebr",
  databaseId: "comite-oebr",
});

export const candidatesCollection = firestore
  .collection("candidates")
  .withConverter({
    toFirestore: (data: Candidate) => data,
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) =>
      snapshot.data() as Omit<Candidate, "id">,
  });

export const votesCollection = firestore.collection("votes").withConverter({
  toFirestore: (data: Vote) => data,
  fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) =>
    snapshot.data() as Vote,
});

export const voteesCollection = firestore.collection("votees");

export const batch = firestore.batch();

export default firestore;
