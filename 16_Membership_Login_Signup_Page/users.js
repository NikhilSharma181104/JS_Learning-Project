// This file simulates a simple database to store user information
// In a real application, you would use a proper database

// Array to store registered users with hashed passwords
let users = [
    // Sample user for testing
    {
        fullname: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        dob: "2000-01-01",
        password: "5f4dcc3b5aa765d61d8327deb882cf99", // "password123" hashed
        membershipType: "basic",
        joinDate: "2023-01-15T12:00:00.000Z"
    }
];