import React from 'react'
import ReactDom from 'react-dom'
import ReactStars from "react-rating-stars-component";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(50, 50, 50, 1)',
    padding: '20px',
    zIndex: 1000,
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

class ReviewFormModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            heading: '',
            review: '',
            rating: 0,
            spoilers: true,
            movie_id: props.movie.id,
            user_id: props.user_id
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleSpoilers = this.toggleSpoilers.bind(this)
        this.updateRating = this.updateRating.bind(this)
        this.modalClose = this.modalClose.bind(this)
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    updateRating(newRating) {
        this.setState({rating: newRating})
    }

    toggleSpoilers(e) {
        const spoilers = e.currentTarget.value === 'true' ? true : false;
        console.log('handle', spoilers);
        this.setState({ spoilers });
    }

    handleSubmit(e) {
        e.preventDefault()
        const review = Object.assign({}, this.state);
        this.props.createReview(review).then(() =>
            this.props.onClose()
        )
            .then(() => {
                this.setState({
                    heading: '',
                    review: '',
                })})
    }

    renderErrors() {
        return (
            <div>
            <h1 className="error-header">There was a problem</h1>
            <ul className="errors">
                {this.props.errors.map((error, i) => (
                    <div>
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                    </div>
                ))}
            </ul>
            </div>
        );
    }
    componentDidMount() {
        this.props.clearErrors()
    }
    modalClose() {
        this.props.onClose()
        this.props.clearErrors()
        this.setState({            
            heading: '',
            review: '',
            rating: 0,
            spoilers: true,
            movie_id: this.props.movie.id,
            user_id: this.props.user_id})
        
    }

    render() {
    const errorfunc = (this.props.errors.length > 0) ? this.renderErrors() : null
    if (!this.props.open) return null

    return ReactDom.createPortal(
        <>
        <div style={OVERLAY_STYLES} onClick={this.modalClose}/>
        <div style={MODAL_STYLES} className="review-form-container">
                <div className="review-form">
                    <h1 className="review-form-header">Write A Review</h1>
                    {errorfunc}
                    <form onSubmit={this.handleSubmit} className="review-form-box">
                        <div className="rating-stars"><ReactStars
                            count={10}
                            onChange={this.updateRating}
                            size={24}
                            activeColor="#ffd700"
                        /></div>
                        <label className="review-form-heading">
                            <input type="text"
                                placeholder="Write a header for your review"
                                value={this.state.heading}
                                onChange={this.update('heading')}
                                className="heading-input"
                            />
                        </label>
                        <br />
                        <label className="review-form-body">
                            <textarea
                                placeholder="Write your review here"
                                value={this.state.review}
                                onChange={this.update('review')}
                                className="body-input"
                            />
                        </label>
                        <label className="spoilers">Does your review contain spoilers?
                        <label><input
                            type="radio"
                            name="spoilers"
                            value="true"
                            checked={this.state.spoilers === true}
                            onChange={this.toggleSpoilers}/>
                            Yes
                        </label>
                            <label><input
                                type="radio"
                                name="spoilers"
                                value="false"
                                checked={this.state.spoilers === false}
                                onChange={this.toggleSpoilers} />
                                No
                            </label>
                        </label>
                        <input className="post-review-button" type="submit" />
                    </form>
                </div>
            {/* <button onClick={this.props.onClose}>Close Modal</button> */}
            {this.props.children}
        </div>
        </>,
        document.getElementById('portal')
    )
    }
}

import { connect } from 'react-redux';

import { createReview, clearErrors } from '../../actions/review_actions.js';

const mapStateToProps = (state) => ({
    reviews: Object.values(state.entities.reviews),
    user_id: state.session.id,
    errors: state.errors.reviews
})

const mapDispatchToProps = dispatch => ({
    createReview: (review) => dispatch(createReview(review)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewFormModal);


// export default ReviewFormModal







