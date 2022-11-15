
// input for this data needed - { habitId, dailyValue, date, userId }
async function addTracker(data) {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                habitId: data.habitId,
                dailyValue: data.dailyValue,
                date: data.date,
                userId: data.userId
            })
        }
        const r = await fetch(`http://localhost:3000/api/trackers`, options)
        return r
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
};