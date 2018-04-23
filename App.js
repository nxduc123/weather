
import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TextInput, ImageBackground, Animated} from 'react-native';
import styles from './app/Screen/styles';
import {fetchWeather,fetchWeatherByCity} from './app/getapi/weather';
import Icon from 'react-native-vector-icons/Ionicons';
import countryData from 'country-data';
import moment from "moment";
const {countries} = countryData;

const iconName = {
    Clear: "ios-sunny-outline",
    Rain: "ios-rainy-outline",
    thunderstorm:'ios-thunderstorm-outline',
    Clouds: 'ios-cloud-outline',
    Snow:'ios-snow-outline',
    Drizzle:'ios-umbrella-outline',
    Haze: 'md-cloudy'
    }
const imagePicture ={
  Clear: require("./app/Screen/images/bg/clear.jpg"),
  Clouds: require("./app/Screen/images/bg/cloud.jpg"),
  Drizzle: require("./app/Screen/images/bg/drizzle.jpg"),
  Haze: require("./app/Screen/images/bg/Haze.jpg"),
  Rain: require("./app/Screen/images/bg/rain.jpg"),
  Snow: require("./app/Screen/images/bg/snow.jpg"),
  thunderstorm: require("./app/Screen/images/bg/thunderstorm.jpg"),
    }


export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      city2: 'Ha Noi',
      city: "default",
      country: "VN",
      pressure: 1010,
      temp: 24,
      tempMax: '',
      tempMin: '',
      weather: "Clear",
      windSpeed: 5.52,
      isVisible: true,
    }
  }
  componentDidMount(){
    this.getLocation()
    console.log(this.state.city2);
  
  }
  getLocation () {
    navigator.geolocation.getCurrentPosition(
      (posData) =>  fetchWeather(posData.coords.latitude, posData.coords.longitude)
      .then( res => {
       this.setState({
         city: res.city,
         country: res.country,
         pressure: res.pressure,
         temp: Math.round(res.temp),
         tempMin: res.tempMin,
         tempMax: res.tempMax,
         weather: res.weather,
         windSpeed: res.windSpeed
       });
       console.log(res);
     } ),
      (error) => console.log(error),
       {timeout: 10000}
   );
  }

  onChangeText (text) {
    console.log(text);
  }

  onSubmitEditing (event) {
    console.log(event);
    fetchWeatherByCity (event)
     .then(res => {
      this.setState({
        city: event,
        country: res.country,
        pressure: res.pressure,
        temp: Math.round(res.temp),
        tempMin: res.tempMin,
        tempMax: res.tempMax,
        weather: res.weather,
        windSpeed: res.windSpeed
      })
       console.log(res);
     }),
    (error) => console.log(error),
    {timeout: 1000}
}
  render () {
    console.log(this.state.weather);
    console.log(this.state.city);
    console.log(imagePicture[this.state.weather]);
    console.log('tempmax',this.state.tempMax);
    return (
       
      <ImageBackground source= {imagePicture[this.state.weather]} style={styles.container}>
        <ImageBackground source={require('./app/Screen/images/bg/shadow.png')} style={styles.container2}>
            <View style={styles.header}> 
                <StatusBar hidden={this.state.hideStatusBar} />
                <TextInput style={{height: 30, borderColor: 'gray', borderLeftWidth: 1, width: '100%',borderRadius: 10,borderColor: '#48BBEC', backgroundColor: 'rgba(255,0,0,0.2)',paddingTop: 10}}
                    placeholder='Tìm Thành Phố'
                    onSubmitEditing={(event) => this.onSubmitEditing(event.nativeEvent.text)}

                />
                <TextInput style={{height: 30, borderColor: 'gray', borderLeftWidth: 1, width: '100%',borderRadius: 10,borderColor: '#48BBEC', backgroundColor: 'rgba(255,0,0,0.2)'}}
                placeholder='Tìm Thành Phố'
                onSubmitEditing={(event) => this.onSubmitEditing(event.nativeEvent.text)}

            />
                <Text style ={ styles.temp}>{this.state.temp}°C</Text>
                <Text style ={ styles.city}>{this.state.city}</Text>
                <Text style= {styles.country}>{countries[this.state.country].name}</Text>
            </View>


            <View style= {styles.body}>
                <Text style={styles.date}>
                
                {moment().format('llll')}
                </Text>
                
                    <View style={styles.bodyContainer}>
                        <View style={styles.columnBody}>
                            <Text style={styles.textTop}>Áp Xuất:   {this.state.pressure} </Text>
                           
                        </View>
                        <View style={styles.columnBody}>
                            <Text style={styles.textTop}>Tốc Gió:   {this.state.windSpeed}</Text>
                           
                        </View>
                        <View style={styles.columnBody}>
                            <Text style={styles.textTop}>Nhiệt Thấp Nhất:   {this.state.tempMin}</Text>
                            
                        </View>
                        <View style={styles.columnBody}>
                            <Text style={styles.textTop}>Nhiệt Cao Nhất: {this.state.tempMax}</Text>
                        
                        </View>
                    </View>
                
            </View> 

            
        </ImageBackground>

     </ImageBackground>
    );
  }
}


/* <View style={styles.bodyContainer}>
<View style={styles.columnBody}>
    <Text style={styles.textTop}>Áp Xuất</Text>
    <Text style= {styles.textBottom}>{this.state.pressure}</Text>
</View>
<View style={styles.columnBody}>
    <Text style={styles.textTop}>Tốc Gió</Text>
    <Text style= {styles.textBottom}>{this.state.windSpeed}</Text>
</View>
<View style={styles.columnBody}>
    <Text style={styles.textTop}>Nhiệt Thấp Nhất</Text>
    <Text style= {styles.textBottom}>{this.state.tempMin}</Text>
</View>
<View style={styles.columnBody}>
    <Text style={styles.textTop}>Nhiệt Cao Nhất</Text>
    <Text style= {styles.textBottom}>{this.state.tempMax}</Text>
</View>
</View> */