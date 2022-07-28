import React, { Component } from "react";
import axios from 'axios';
import PaginationComponent from "../layout/PaginationComponent";

class PaginationEvent extends Component {
    state = {
        data: [],
        totalRecords:0,
        limit: 10
    }
    componentDidMount(){
        this.loadData(1);
        console.log("piesek");
    }
    loadData = (page) =>{
        console.log('page>>',page)
        axios
            .get(`http://localhost:8081/admin/language/languagePage=`+page)
            .then(res => {

                const data = res.data;
                console.log('data>>>>',data)
                this.setState({
                    data: data.data,
                    totalRecords : data.total ? data.total : 0,
                    limit : data.per_page ? data.per_page : 10
                })
            });
    }
    getPaginatedData = page =>{
        this.loadData(page);
    }
    render(){
        const { data, totalRecords, limit } = this.state;
        return(
            <div>
                {totalRecords > 10 &&
                    <PaginationComponent
                        getAllData={this.getPaginatedData}
                        totalRecords={totalRecords}
                        itemsCountPerPage = {limit} />
                }
            </div>
        );
    }
}

export default PaginationEvent;