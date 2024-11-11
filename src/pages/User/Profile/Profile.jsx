import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, Button } from '@mui/material';

const Profile = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <section className="section myAccountPage">
      <div className="container">
        <h2 className="hd">My Account</h2>

        <Box sx={{ width: "100%" }} className="myAccBox card border-0">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Edit Profile" />
              <Tab label="Change Password" />
            </Tabs>
          </Box>
          {tabIndex === 0 && (
            <Box>
              <form>
                <div className="row">
                  <div className="col-md-4 mt-3">
                    <div className="userImage d-flex align-items-center justify-content-center">
                      <div className="overlay d-flex align-items-center justify-content-center">
                        <input type="file" multiple name="images" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8 mt-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Name"
                            variant="outlined"
                            className="w-100"
                            name="name"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Email"
                            disabled
                            variant="outlined"
                            className="w-100"
                            name="email"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Phone"
                            variant="outlined"
                            className="w-100"
                            name="phone"
                          />
                        </div>
                        
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Name"
                            variant="outlined"
                            className="w-100"
                            name="name"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Email"
                            disabled
                            variant="outlined"
                            className="w-100"
                            name="email"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Phone"
                            variant="outlined"
                            className="w-100"
                            name="phone"
                          />
                        </div>
                        
                      </div>
                    </div>

                    <div className="form-group">
                      <Button
                        type="submit"
                        className="btn-blue bg-red btn-lg btn-big"
                        style={{backgroundColor: '#ffe8d6', color: '#000'}}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  
                </div>
              </form>
            </Box>
          )}
          {tabIndex === 1 && (
            <Box>
              <form>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            label="Old Password"
                            variant="outlined"
                            className="w-100"
                            name="oldPassword"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            label="New Password"
                            variant="outlined"
                            className="w-100"
                            name="password"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            label="Confirm Password"
                            variant="outlined"
                            className="w-100"
                            name="confirmPassword"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <Button
                        type="submit"
                        className="btn-blue bg-red btn-lg btn-big "
                        style={{backgroundColor: '#ffe8d6' ,color: '#000'}}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Box>
          )}
        </Box>
      </div>
    </section>
  );
};

export default Profile;
