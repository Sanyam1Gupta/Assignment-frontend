import React from 'react';
import { Route } from 'react-router-dom';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
class Contest extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      contest:""
    };
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

   async componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params.id);
        let r;
        await fetch(`https://codeforces.com/api/contest.list`)
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>
            {
            r=data.result;
        }
          )
          var k;
          console.log(r[1]);
          for (var j = 0; j < r.length; j++){

            if(r[j].id==params.id)
            {
                k=r[j];
                break;
            }
            
            }
            this.setState({contest:k})
            console.log(this.state.contest);
          
      }

      
      render() {
        const { id, name, type, durationSeconds } = this.state.contest;
        let duration= this.secondsToHms(durationSeconds);
        return (
          <React.Fragment>
               <Card style={{ width: '100rem' }} className='bg-info'>
  <CardBody>
    <CardTitle style={{color: "red"}}>{name}</CardTitle>
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
           </React.Fragment>
        );
      }
  }

  export default Contest;