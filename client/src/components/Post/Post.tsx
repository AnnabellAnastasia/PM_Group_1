import React from 'react';
import './Post.css';

interface PostProps {
    profileImage: string;
    name: string;
    jobTitle: string;
    timePosted: string;
    content: string;
    jobLink?: string;
    reactionsCount: number;
    commentsCount: number;
    repostsCount: number;
}

const Post: React.FC<PostProps> = ({
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
        <div className="post">
            <div className="post-header">
                <img src={profileImage} alt={`${name}'s profile`} className="profile-image" />
                <div className="post-info">
                    <h3>{name}</h3>
                    <p>{jobTitle}</p>
                    <span>{timePosted}</span>
                </div>
            </div>
            <div className="post-content">
                <p>{content}</p>
                {jobLink && (
                    <div className="job-card">
                        <a href={jobLink} target="_blank" rel="noopener noreferrer">
                            <div className="job-card-content">
                                <h4>View Job</h4>
                                <p>Open Rank-Associate Professor or Full Professor</p>
                                <p>Georgia Institute of Technology</p>
                            </div>
                        </a>
                    </div>
                )}
            </div>
            <div className="post-reactions">
                <span>👍 {reactionsCount}</span>
                <span>{commentsCount} comments</span>
                <span>{repostsCount} reposts</span>
            </div>
            <div className="post-actions">
                <button>Like</button>
                <button>Comment</button>
                <button>Repost</button>
                <button>Send</button>
            </div>
            <div className="post-comment">
                <input type="text" placeholder="Add a comment..." />
            </div>
        </div>
    );
};

export default Post;
