import React from 'react';
import { AppStateProps } from '../dataContext';

type VisualizationContainerProps = AppStateProps

const VisualizationContainer: React.FC<VisualizationContainerProps> = () => {
    return (
        <div id="visualization" className="w-3/5 border border-gray-300 rounded my-5 h-96">
            {/* D3 visualizations will be added here */}
        </div>
    );
};

export default VisualizationContainer;
