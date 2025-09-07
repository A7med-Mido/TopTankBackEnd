<p align="center">
  <img src="https://raw.githubusercontent.com/A7med-Mido/TopTankBackEnd/main/public/TopTankImage.png" alt="TopTank Image" width="400" />
</p>


# TopTank System
<p align="center">
  <img src="https://raw.githubusercontent.com/A7med-Mido/TopTankBackEnd/main/public/TopTankDiagram.png" alt="TopTank Diagram" />
</p>


# TopTank System Flow

### Student flow 📚🧑🏻‍🎓
_Subscription flow_

- The Client sends a request to verify payment and get a course Key 🔑.
- The VPS validates the user, verifies payment, generates a Key, and stores it in the Database.
- The VPS sends a response containing the Key and the video URI pointing to the course video in the Cloud.
- The Client receives the response, then sends a request to the Cloud including its JWT.
- The Cloud server validates the user from the VPS Database and checks if a generated key exists for the teacher; it then stores that key, the teacher username, and the course id in the Cloud sqlite database for fast querying.
- The Cloud sends back video data.
- The student receives the video stream by chunks!!

### Teacher flow 👨🏻‍🏫

#### Registration flow
- The Teacher registers in the app with `{ name, username, phone, password, image }` as required values.
- The backend VPS creates a teacher user with default values `{ followers: 0, balance: 0, verified: false, courses: [] }` and stores the image in the VPS filesystem.
- The backend stores the data in the Database, hashes the password, creates a JWT, sends it back to the client, and the client stores it.
- There are restriction rules: the teacher cannot upload courses on the platform until they reach 15k followers (become "verified").

#### Uploading flow
- The Client sends a request directly to the Cloud server to check permission to upload.
- The Cloud server checks if the teacher (by username) is present in the Cloud sqlite database; if not present, it queries the VPS database to see if they have the required number of followers to upload courses.
- If the teacher has permission, the upload completes and the Cloud stores the teacher info in the Cloud sqlite database for fast querying.
- If the Teacher loses their internet connection during upload, the Cloud immediately deletes the written meta file and resets the teacher info in the sqlite database.

#### Deleting Course flow
- The Teacher sends a request directly to the Cloud storage to delete a specific course/video.
- The Cloud server validates the teacher from the pre-stored info in the sqlite database to confirm permission to delete the course/video.
- The Cloud deletes anyone who has a key to this course by searching them with the course id and teacher username.

