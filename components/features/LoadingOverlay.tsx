import React from 'react';

interface ILoadingOverlayProps {
    
}

const LoadingOverlay: React.FC<ILoadingOverlayProps> = () => {
    return (
        <div style={{
            zIndex: 9,
            backgroundColor: 'white',
            position: 'fixed',
            opacity: '0.7',
            width: '100%',
            height: '100vh'
        }}>
        </div>
    )
}

export default LoadingOverlay;