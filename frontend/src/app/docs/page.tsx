'use client';

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="flex">
        <nav className="w-64 h-screen fixed p-8 bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#endpoints" className="hover:text-blue-400 transition-colors">API Endpoints</a></li>
            <li><a href="#consumption" className="hover:text-blue-400 transition-colors">Example of Consumption</a></li>
            <li><a href="#responses" className="hover:text-blue-400 transition-colors">API Responses</a></li>
            <li><a href="#errors" className="hover:text-blue-400 transition-colors">Common Errors</a></li>
            <li><a href="#testing" className="hover:text-blue-400 transition-colors">Testing the API</a></li>
            <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
          </ul>
        </nav>

        <div className="ml-64 flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">API Documentation</h1>
            
            <section id="endpoints" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">API Endpoints</h2>
              <ul className="list-disc list-inside text-gray-400 mb-4">
                <li>
                  <strong>GET /stats</strong> - Retrieves statistics about DNA analysis.
                </li>
                <li>
                  <strong>POST /mutant</strong> - Sends a DNA sequence to analyze if it is mutant.
                </li>
              </ul>
            </section>

            <section id="consumption" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Example of Consumption</h2>
              <p className="text-gray-400 mb-4">
                Here is an example of how to consume the <strong>/mutant</strong> endpoint using fetch:
              </p>
              <pre className="bg-gray-800 p-4 rounded">
                <code>
                  {`fetch('/mutant', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                </code>
              </pre>
            </section>

            <section id="responses" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">API Responses</h2>
              <p className="text-gray-400 mb-4">
                The API returns responses in JSON format. Here are examples of the expected responses:
              </p>
              <h3 className="text-xl font-semibold mb-2">GET /stats</h3>
              <pre className="bg-gray-800 p-4 rounded">
                <code>
                  {`{
  "count_mutant_dna": 40,
  "count_human_dna": 100,
  "ratio": 0.4
}`}
                </code>
              </pre>
              <h3 className="text-xl font-semibold mb-2">POST /mutant</h3>
              <pre className="bg-gray-800 p-4 rounded">
                <code>
                  {`{
  "isMutant": true
}`}
                </code>
              </pre>
            </section>

            <section id="errors" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Common Errors</h2>
              <p className="text-gray-400 mb-4">
                Here are some common errors you might encounter and how to solve them:
              </p>
              <h3 className="text-xl font-semibold mb-2">400 Bad Request</h3>
              <p className="text-gray-400 mb-4">
                This error occurs when the request is invalid. Make sure to send the data in the correct format.
              </p>
              <h3 className="text-xl font-semibold mb-2">500 Internal Server Error</h3>
              <p className="text-gray-400 mb-4">
                This error indicates a problem on the server. Contact me on <a href="https://www.linkedin.com/in/estefania-del-valle-fiorabanti/" className="text-blue-400">my LinkedIn profile</a>.
              </p>
            </section>

            <section id="testing" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Testing the API</h2>
              <p className="text-gray-400 mb-4">
                Here&apos;s how to test the API using tools like Postman and cURL, as well as how to write unit tests in JavaScript and Python.
              </p>

              <h3 className="text-xl font-semibold mb-2">Using Postman</h3>
              <p className="text-gray-400 mb-4">
                Postman is a popular tool for testing APIs. Here&apos;s how to set up and use Postman to test your endpoints.
              </p>
              <ol className="list-decimal list-inside text-gray-400 mb-4">
                <li>Open Postman and click the &quot;New&quot; button to create a new request.</li>
                <li>Select &quot;Request&quot; and give your request a name, for example, &quot;Check Mutant&quot;.</li>
                <li>Select the HTTP method you want to use (GET or POST).</li>
                <li>In the address bar, enter the URL of your API, for example, <code>http://localhost:3000/mutant</code>.</li>
                <li>Select the &quot;Body&quot; tab.</li>
                <li>Select &quot;raw&quot; and then &quot;JSON&quot; from the dropdown menu.</li>
                <li>Enter the request body in JSON format:</li>
                <pre className="bg-gray-800 p-4 rounded">
                  <code>
                    {`{
  "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}`}
                  </code>
                </pre>
                <li>Click &quot;Send&quot; to send the request.</li>
                <li>Review the response in the &quot;Response&quot; section.</li>
              </ol>

              <h3 className="text-xl font-semibold mb-2">Using cURL</h3>
              <p className="text-gray-400 mb-4">
                cURL is a command-line tool you can use to make HTTP requests. Here&apos;s how to use cURL to test your endpoints.
              </p>
              <h4 className="text-lg font-semibold mb-2">Testing the POST Request for /api/mutant</h4>
              <pre className="bg-gray-800 p-4 rounded">
                <code>
                  {`curl -X POST http://localhost:3000/api/mutant \\
-H "Content-Type: application/json" \\
-d "{\\"dna\\": [\\"ATGCGA\\", \\"CAGTGC\\", \\"TTATGT\\", \\"AGAAGG\\", \\"CCCCTA\\", \\"TCACTG\\"]}"
`}
                </code>
              </pre>
              <h4 className="text-lg font-semibold mb-2">Testing the GET Request for /api/stats</h4>
              <pre className="bg-gray-800 p-4 rounded">
                <code>
                  {`curl http://localhost:3000/api/stats`}
                </code>
              </pre>
            </section>

            <section id="contact" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Contact</h2>
              <p className="text-gray-400 mb-4">
                If you have any questions or need support, you can contact me on <a href="https://www.linkedin.com/in/estefania-del-valle-fiorabanti/" className="text-blue-400">my LinkedIn profile</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}