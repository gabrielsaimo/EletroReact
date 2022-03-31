import * as React from 'react';
import { Appbar } from 'react-native-paper';

const SearchBar = ({route}) => {
    return (
        <Appbar.Header style={{backgroundColor: '#1534C8'}}>
            <Appbar.Content titleStyle={{textAlign: 'center',fontSize:30}} title={'Categorias'} />
        </Appbar.Header>
    );
};

export default SearchBar;