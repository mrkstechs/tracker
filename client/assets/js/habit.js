
async function exPreview (user, exercise) {
    try {
        const response = await fetch(`/goals/${user}/${exercise}`)
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

function slePreview () {

}

function watPreview () {

}