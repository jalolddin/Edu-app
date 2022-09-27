export default function ({ app, store, redirect, next }) {
  if (!process.server) {
    // console.log("middleware from client side");
  }
  if (process.server) {
    // console.log("middleware from server side");
  }
  // If the user is not authenticated
}
