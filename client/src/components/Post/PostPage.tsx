import React from 'react';
import Post from './Post';
import './Post.css';

const PostPage: React.FC = () => {
    const posts = [
        {
            profileImage: 'https://example.com/profile.jpg',
            name: 'Annabella Wilkins',
            jobTitle: 'Machine Learning Engineer at Google',
            timePosted: '3d',
            content: '...',
            jobLink: 'https://example.com/job-posting',
            reactionsCount: 45,
            commentsCount: 1,
            repostsCount: 4,
        },
        {
            profileImage: 'https://example.com/profile.jpg',
            name: 'Annabella Wilkins',
            jobTitle: 'Machine Learning Engineer at Google',
            timePosted: '3d',
            content: '...',
            jobLink: 'https://example.com/job-posting',
            reactionsCount: 45,
            commentsCount: 1,
            repostsCount: 4,
        },
        
    ];

    return (
        <div className="post-page">
            {posts.map((post, index) => (
                <Post key={index} {...post} />
            ))}
        </div>
    );
};

export default PostPage;
