import izitoast from 'izitoast';

export function showFlashMessage(message){
    return dispatch => {
        izitoast[message.type]({
            title: message.title,
            message: message.text,
            position: message.position || 'topCenter'
        });
    }
}