import { connect } from 'react-redux';
import UserReviewIndex from './user_review_index';
import { fetchUserReviews, deleteReview } from '../../actions/review_actions';
import { fetchMovie, fetchMovies } from '../../actions/movie_actions'

const mapStateToProps = (state, ownProps) => {
    return {user: state.entities.users[state.session.id],
            reviews: Object.values(state.entities.reviews),
            movies: Object.values(state.entities.movies)}
};

const mapDispatchToProps = dispatch => ({
    fetchUserReviews:(userId) => dispatch(fetchUserReviews(userId)),
    deleteReview:(userId, reviewId) => dispatch(deleteReview(userId, reviewId)),
    fetchMovies:() => dispatch(fetchMovies()) ,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserReviewIndex);

