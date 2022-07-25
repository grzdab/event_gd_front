import React from 'react';
import ButtonDelete from './ButtonDelete';
import ButtonEdit from './ButtonEdit';
import ModalEdit from "./ModalEdit";

const sortTypes = {

    up: {
        class: 'sort-up',
        fn: (a, b) => a.id - b.id
    },
    down: {
        class: 'sort-down',
        fn: (a, b) => b.id - a.id
    },
    default: {
        class: 'sort',
        fn: (a, b) => a
    }
};

class Table extends React.Component {

    // declaring the default state
    state = {
        currentSort: 'default'
    };

    // method called every time the sort button is clicked
    // it will change the currentSort value to the next one
    onSortChange = () => {
        console.log("zmiana sortowania");
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';

        console.log("current sort");
        console.log(currentSort);
        console.log("sortType");
        console.log(sortTypes);
        this.setState({
            currentSort: nextSort
        });
    };

    render() {
        const { data } = this.props;
        const { currentSort } = this.state;

        return (
            <table className='text-left'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>
                        Language
                        <button onClick={this.onSortChange}>
                            <i className={`fas fa-${sortTypes[currentSort].class}`} />
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {[...data].sort(sortTypes[currentSort].fn).map(p => (
                    <tr>
                        <td>{p.id}</td>
                        <td>{p.propertyName}</td>
                        <td><ButtonEdit e={p}/></td>
                        <td><ButtonDelete e={p}/></td>
                    </tr>
                ))}
                </tbody>
        <ModalEdit />
            </table>
    );
    }
}
export default Table