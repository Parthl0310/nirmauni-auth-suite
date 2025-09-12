import React, { useState, useRef } from 'react';
import { Camera, Edit, Save, X, User, Mail, Calendar, Building, MapPin, Badge, Phone, BookOpen, Award, FileText, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const sampleFacultyData = {
  "_id": "68c152eb4ccf23cbea305d85",
  "fullName": "Rajodiya Kenil Ashokbhai",
  "email": "23be139@nirmauni.ac.in",
  "profilePic": "https://res.cloudinary.com/dotjcgaai/image/upload/v1757500137/a9mv3jeeiiqmx99zrcom.png",
  "role": "Associate Professor",
  "department": "Computer Science & Engineering",
  "dob": "2005-11-19T00:00:00.000Z",
  "phone": "0913 854 235",
  "gender": "Male",
  "nationality": "Indian",
  "language": "English, Hindi, Gujarati",
  "maritalStatus": "Single",
  "permanentAddress": "5, Nirma University Street, Ahmedabad, Gujarat, India",
  "currentAddress": "29, Nirma Campus, Ahmedabad, Gujarat, India",
  "university": {
    "_id": "68c14c44986cc6876d4444b3",
    "name": "nirma university",
    "address": "Ahmedabad, Gujarat, India"
  },
  "faculty": {
    "_id": "68c152eb4ccf23cbea305d87",
    "user": "68c152eb4ccf23cbea305d85",
    "facultyId": "FAC-001"
  }
};

const FacultyProfile = () => {
  const [facultyData, setFacultyData] = useState(sampleFacultyData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(sampleFacultyData);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...facultyData });
  };

  const handleSave = () => {
    setFacultyData({ ...editedData });
    if (profilePicPreview) {
      setFacultyData(prev => ({ ...prev, profilePic: profilePicPreview }));
    }
    setIsEditing(false);
    setProfilePicPreview(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(facultyData);
    setProfilePicPreview(null);
  };

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setEditedData(prev => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [field]: value
        }
      }));
    } else {
      setEditedData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayData = isEditing ? editedData : facultyData;
  const currentProfilePic = profilePicPreview || displayData.profilePic;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <span>Faculty</span> / <span>Faculty list</span> / <span className="text-primary">Faculty detail</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Faculty Profile</h1>
          </div>
          
          <div className="flex gap-2">
            {!isEditing ? (
              <Button onClick={handleEdit} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-flex">
            <TabsTrigger value="profile">Faculty profile</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            {/* Profile Header Card */}
            <Card className="shadow-soft mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Profile Picture */}
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-border">
                      <AvatarImage 
                        src={currentProfilePic} 
                        alt={displayData.fullName}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-lg bg-primary/10 text-primary">
                        {displayData.fullName?.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    {isEditing && (
                      <Button
                        size="icon"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="h-3 w-3" />
                      </Button>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      className="hidden"
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                          <Input
                            id="fullName"
                            value={editedData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="text-xl font-bold mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="role" className="text-sm font-medium">Role / Department</Label>
                          <Input
                            id="role"
                            value={`${editedData.role} | ${editedData.department || 'Department'}`}
                            onChange={(e) => {
                              const [role, dept] = e.target.value.split(' | ');
                              handleInputChange('role', role);
                              handleInputChange('department', dept || '');
                            }}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h2 className="text-xl font-bold text-foreground">{displayData.fullName}</h2>
                        <p className="text-primary font-medium">{displayData.role} | {displayData.department}</p>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Faculty ID:</span>
                        <p className="font-medium">{displayData.faculty?.facultyId}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone number:</span>
                        <p className="font-medium">{displayData.phone}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Email:</span>
                        <p className="font-medium">{displayData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Personal Information */}
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-semibold">Personal information</CardTitle>
                  {!isEditing && (
                    <Button variant="ghost" size="icon" onClick={handleEdit}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-sm">Gender</Label>
                      {isEditing ? (
                        <Input
                          value={editedData.gender || ''}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium">{displayData.gender}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-sm">Date of birth</Label>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editedData.dob?.split('T')[0]}
                          onChange={(e) => handleInputChange('dob', e.target.value + 'T00:00:00.000Z')}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium">{formatDate(displayData.dob)}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-sm">Faculty ID</Label>
                    <p className="font-medium">{displayData.faculty?.facultyId}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-sm">Nationality</Label>
                      {isEditing ? (
                        <Input
                          value={editedData.nationality || ''}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium">{displayData.nationality}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-sm">Religion</Label>
                      {isEditing ? (
                        <Input
                          value={editedData.religion || 'None'}
                          onChange={(e) => handleInputChange('religion', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium">{displayData.religion || 'None'}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-sm">Language</Label>
                      {isEditing ? (
                        <Input
                          value={editedData.language || ''}
                          onChange={(e) => handleInputChange('language', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium">{displayData.language}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-sm">Marital status</Label>
                      {isEditing ? (
                        <Input
                          value={editedData.maritalStatus || ''}
                          onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium">{displayData.maritalStatus}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-sm">Permanent address</Label>
                    {isEditing ? (
                      <Input
                        value={editedData.permanentAddress || ''}
                        onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium">{displayData.permanentAddress}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-sm">Current address</Label>
                    {isEditing ? (
                      <Input
                        value={editedData.currentAddress || ''}
                        onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium">{displayData.currentAddress}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Education Information */}
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-semibold">Education information</CardTitle>
                  {!isEditing && (
                    <Button variant="ghost" size="icon" onClick={handleEdit}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">PhD in Computer Science</p>
                        <p className="text-sm text-muted-foreground">{displayData.university?.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">2018-2022</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Master of Computer Applications</p>
                        <p className="text-sm text-muted-foreground">{displayData.university?.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">2016-2018</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* University Information */}
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-semibold">University information</CardTitle>
                  {!isEditing && (
                    <Button variant="ghost" size="icon" onClick={handleEdit}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-sm">University Name</Label>
                      {isEditing ? (
                        <Input
                          value={editedData.university?.name || ''}
                          onChange={(e) => handleInputChange('name', e.target.value, 'university')}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium capitalize">{displayData.university?.name}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-sm">Department</Label>
                      {isEditing ? (
                        <Input
                          value={editedData.department || ''}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium">{displayData.department}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-sm">Faculty ID</Label>
                      <p className="font-medium">{displayData.faculty?.facultyId}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-sm">Employee Status</Label>
                      <p className="font-medium">Active</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-sm">University Address</Label>
                    {isEditing ? (
                      <Input
                        value={editedData.university?.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value, 'university')}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium capitalize">{displayData.university?.address}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-sm">Joining Date</Label>
                    <p className="font-medium">1st March, 2020</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="mt-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <p className="text-muted-foreground">Courses information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendance" className="mt-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <p className="text-muted-foreground">Attendance information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <p className="text-muted-foreground">Reports information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <p className="text-muted-foreground">Analytics information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <p className="text-muted-foreground">Documents information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyProfile;