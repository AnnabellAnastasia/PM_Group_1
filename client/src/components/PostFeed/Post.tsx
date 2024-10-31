import React from 'react';
import './Post.css';
// interface PostProps {
//     profileImage: string;
//     name: string;
//     jobTitle: string;
//     timePosted: string;
//     content: string;
//     jobLink?: string;
//     reactionsCount: number;
//     commentsCount: number;
//     repostsCount: number;
// }

function Post({ postKey, postObj }: any) {


    return (
        <div className="post">
            <div className="post-header">
                <img src={`../images/${postObj.creator.image ? postObj.creator.image : 'blank-profile-picture.png'}`}  alt={`${postObj.creator.firstName} ${postObj.creator.lastName}'s profile`} className="profile-image" />
                <div className="post-info">
                    <h3>{postObj.creator.firstName}&nbsp;{postObj.creator.lastName}</h3>
                    <p>{postObj.creator.email}</p>
                    <span>{postObj.createdAt}</span>
                </div>
            </div>
            <div className="post-content">
                <p>{postObj.body}</p>
                {/* {jobLink && (
                    <div className="job-card">
                        <a href={jobLink} target="_blank" rel="noopener noreferrer">
                            <div className="job-card-content">
                                <h4>View Job</h4>
                                <p>Open Rank-Associate Professor or Full Professor</p>
                                <p>Georgia Institute of Technology</p>
                            </div>
                        </a>
                    </div>
                )} */}
            </div>
            <div className="post-reactions">
                {/* <span>👍 {reactionsCount}</span>
                <span>{commentsCount} comments</span>
                <span>{repostsCount} reposts</span> */}
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
