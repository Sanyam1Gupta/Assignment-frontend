import React from 'react';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Contest from './Contest.js';
import Grid from '@material-ui/core/Grid';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Pagination from "react-js-pagination";
class AllContests extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
      error: null,
      search: "",
      sel: "",
      currentPage: 1,
          todosPerPage: 5,
    };

    this.updateSearch = this.updateSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePages = this.handlePages.bind(this);
  }


      componentDidMount() {
        this.fetchUsers();
      }

      secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay; 
    }

      updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
        console.log(this.state.search);
      }

      handleChange(event) {
        this.setState({sel: event.target.value});
      }
      handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({currentPage: pageNumber});
      }
      handlePages(event) {
        this.setState({todosPerPage: event.target.value});
      }

      fetchUsers() {
        // Where we're fetching data from
        fetch(`https://codeforces.com/api/contest.list`)
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>
            {
            console.log(data);
            this.setState({
              users: data.result,
              isLoading: false,
            })
        }
          )
          // Catch any errors we hit and update the app
          .catch(error => this.setState({ error, isLoading: false }));
      }
      render() {
        let filt=this.state.users.filter(
          (user) => {
            return user.name.indexOf(this.state.search) !== -1 && user.type.indexOf(this.state.sel) !== -1;
          }
        );
        
        
        const { isLoading, users, error, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = filt.slice(indexOfFirstTodo, indexOfLastTodo);
        const pageNumbers = [];
        console.log(todosPerPage);
        for (let i = 1; i <= Math.ceil(filt.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }
        return (
          <React.Fragment>
            <h1>All Contests</h1>
            
            <input style={{ width: "500px",height: "40px" }} placeholder="Search contests" type="text" 
                value={this.state.search}
                onChange={this.updateSearch}
                />

<select style={{ width: "140px",height: "40px" }} value={this.state.sel} onChange={this.handleChange}>
             <option value="">No select</option>
            <option value="ICPC">ICPC</option>
            <option value="CF">CF</option>
          </select>    
          <select style={{ width: "140px",height: "40px" }} value={this.state.todosPerPage} onChange={this.handlePages}>
             <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
          </select>
          <div>
        <Pagination
          activePage={this.state.currentPage}
          totalItemsCount={filt.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
            {error ? <p>{error.message}</p> : null}
            {!isLoading ? (
              currentTodos.map(user => {
                const { id, name, type, durationSeconds } = user;
                let duration=this.secondsToHms(durationSeconds);
                return (
                  <div key={id}>
                    <Card style={{ width: '35rem' }} className='bg-warning'>
  <CardBody>
    <CardTitle style={{color: "red"}}><Link to={`/contest/${user.id}`}>{name}</Link></CardTitle>
    <CardSubtitle className="mb-4">Type: {type}</CardSubtitle>
    <CardText>
      <div>
        Duration: {duration}
      </div>
      <div>
        Started on:
      </div>
      <Button color="success">Register</Button>
    </CardText>
  </CardBody>
</Card>
                  </div>
                );
              })
            // If there is a delay in data, let's let the user know it's loading
            ) : (
              <h3>Loading...</h3>
            )}
            
          </React.Fragment>
        );
      }
      
      
  }

  export default AllContests;