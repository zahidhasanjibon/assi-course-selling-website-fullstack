export default function Blog() {
  return (
    <div className="container mx-auto">
      <div className="w-[90%] mx-auto mt-16 pb-6">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mx-auto">
          <div className="shadow-lg p-4">
            <h2 className="text-center mb-4 font-bold text-xl text-blue-600">
              what is cors ?
            </h2>

            <p>
              Cross-Origin Resource Sharing (CORS) is an HTTP-header based
              mechanism that allows a server to indicate any origins (domain,
              scheme, or port) other than its own from which a browser should
              permit loading resources. CORS also relies on a mechanism by which
              browsers make a "preflight" request to the server hosting the
              cross-origin resource, in order to check that the server will
              permit the actual request. In that preflight, the browser sends
              headers that indicate the HTTP method and headers that will be
              used in the actual request.
            </p>
          </div>
          <div className="shadow-lg p-4">
            <h2 className=" text-center mb-4 font-bold text-xl text-blue-600">
              why are you using firebase ? What other options do you have to
              implement authentication?
            </h2>

            <p>
              Firebase concept is simple. When you build a client-side app with
              JavaScript or any of its frameworks, for instance, Google Firebase
              can turn this into a serverless app in no time. It also removes
              the need to manage databases yourself, as it does that for you. it
              is redy made backend for our client to make it dynamic
            </p>

            <p>
              {" "}
              storage ,hosting ,firebase ML, authentication, push notifications
            </p>

            <p>
              Usually, authentication by a server entails the use of a user name
              and password. Other ways to authenticate can be through cards,
              retina scans, voice recognition, and fingerprints.
            </p>
          </div>

          <div className="shadow-lg p-4">
            <h2 className="text-center mb-4 text-xl text-blue-600 font-bold">
              {" "}
              How does the private route work ?{" "}
            </h2>
            <p>
              The private route component is similar to the public route, the
              only change is that redirect URL and authenticate condition. If
              the user is not authenticated he will be redirected to the login
              page and the user can only access the authenticated routes If he
              is authenticated (Logged in).
            </p>
          </div>
          <div className="shadow-lg p-4">
            <h2 className="text-center mb-4 text-xl text-blue-600 font-bold">
              {" "}
              What is Node? How does Node work ?
            </h2>
            <p>
              Node.js is a JavaScript runtime environment that achieves low
              latency and high throughput by taking a “non-blocking” approach to
              serving requests. In other words, Node.js wastes no time or
              resources on waiting for I/O requests to return.
            </p>
            <p>
              Node.js accepts the request from the clients and sends the
              response, while working with the request node.js handles them with
              a single thread. To operate I/O operations or requests node.js use
              the concept of threads. Thread is a sequence of instructions that
              the server needs to perform. It runs parallel on the server to
              provide the information to multiple clients. Node.js is an event
              loop single-threaded language. It can handle concurrent requests
              with a single thread without blocking it for one request. Node.js
              basically works on two concept Asynchronous Non-blocking I/O
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
