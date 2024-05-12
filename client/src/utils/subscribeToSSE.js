function subscribeToSSE(user) {
  const eventSource = new EventSource("/api/sse");

  eventSource.onopen = () => {
  };

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Handle the received SSE data
    // For example, dispatch an action in Redux or update the UI
  };

  eventSource.onerror = (error) => {
    console.error("SSE error:", error);
  };

  return () => {
    eventSource.close();
  };
}

export default subscribeToSSE;
