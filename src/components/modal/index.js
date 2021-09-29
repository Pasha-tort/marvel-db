import {Component} from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component{

    render() {

        const {data} = this.props;

        if (this.modalBox === undefined) {
            this.modalBox = document.createElement('div');
            this.modalBox.classList.add('details-box__modal');
            this.modalBox.classList.add('details-box__modal_active');
            this.modalBox.addEventListener('click', (event) => {
                if(event.target && event.target.matches('.details-box__modal')) {
                    document.body.removeChild(this.modalBox);
                    document.body.style.overflow = 'auto';
                }
            });
            document.body.appendChild(this.modalBox);
            document.body.style.overflow = 'hidden';
        }
    
        return (
            ReactDOM.createPortal(
                    data
                
                , this.modalBox
            )
        )
    }
}

export default Modal;

