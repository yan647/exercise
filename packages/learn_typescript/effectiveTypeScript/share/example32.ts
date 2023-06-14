async function getQuote() {
  const response = await fetch('/quote?by=Mark+Twain');// Type is Promise<Response>
  const quote = await response.json();
  return quote;
}

// lib.dom.d.ts
declare function fetch(
  input: RequestInfo, init?: RequestInit
): Promise<Response>;


async function checkedFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return response;
}

const checkedFetch2: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return response;
}
