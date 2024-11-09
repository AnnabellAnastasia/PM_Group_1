import React from 'react';
import './Post.css';

interface PostProps {
    profileImage: string;
    name: string;
    jobTitle: string;
    timePosted: string;
    content: string;
    jobLink: string;
    reactionsCount: number;
    commentsCount: number;
    repostsCount: number;
}

const CreatePost: React.FC<PostProps> = ({
    profileImage,
    name,
    jobTitle,
    timePosted,
    content,
    jobLink,
    reactionsCount,
    commentsCount,
    repostsCount
}) => {
    return (
        <div className="post card mb-4 shadow-sm">
            <div className="card-body">
                {/* Post Header */}
                <div className="post-header d-flex align-items-center mb-3">
                    <img src={profileImage} alt={`${name}'s profile`} className="profile-image rounded-circle me-3" />
                    <div className="post-info">
                        <h5 className="mb-0">{name}</h5>
                        <small className="text-muted">{jobTitle}</small>
                        <br />
                        <small className="text-muted">{timePosted}</small>
                    </div>
                </div>

                {/* Post Content */}
                <div className="post-content mb-3">
                    <p>{content}</p>
                    <div className="job-card card bg-light p-3">
                        <a href={jobLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            <div className="job-card-content">
                                <h6 className="mb-1">View Job</h6>
                                <p className="mb-0 text-muted">Open Rank-Associate Professor or Full Professor</p>
                                <p className="mb-0 text-muted">Georgia Institute of Technology</p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Reactions */}
                <div className="post-reactions d-flex justify-content-between text-muted mb-3">
                    <span>👍 {reactionsCount}</span>
                    <span>{commentsCount} comments</span>
                    <span>{repostsCount} reposts</span>
                </div>

                {/* Post Actions */}
                <div className="post-actions d-flex justify-content-around">
                    <button className="btn btn-light btn-sm">Like</button>
                    <button className="btn btn-light btn-sm">Comment</button>
                    <button className="btn btn-light btn-sm">Repost</button>
                    <button className="btn btn-light btn-sm">Send</button>
                </div>
            </div>
        </div>
    );
};
export default CreatePost;
