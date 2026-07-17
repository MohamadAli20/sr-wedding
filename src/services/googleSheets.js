export async function submitRsvp(data) {
    const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(result.error || 'Unable to submit your RSVP. Please try again.');
    }

    return result;
}
