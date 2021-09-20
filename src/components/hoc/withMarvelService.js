import React from 'react';
import MarvelServiceContext from '../marvel-service-context';

const WithMarvelService = () => (Wrapper) => {
    return (
        (props) => {
            return (
                <MarvelServiceContext.Consumer>
                    {
                        (MarvelService) => {
                            return <Wrapper {...props} MarvelService={MarvelService}/>
                        }
                    }
                </MarvelServiceContext.Consumer>
            )
        }
    )
};

export default WithMarvelService;