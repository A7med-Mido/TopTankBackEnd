import axios from "axios";
import CloudModel from "../configs/models/Cloud.model";

export const fetchCloudsData = async ({

}:{

}) => {
  try {
    const clouds = await CloudModel.find({});

    const ips = clouds.map(cloud => {
      return cloud.ip
    })
    console.log(ips)
    return ips
  } catch(error) {
    console.log(error)
  }
}