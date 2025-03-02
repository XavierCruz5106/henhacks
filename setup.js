// setup.js
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables from .env file

async function createCollections(db) {
  try {
    // Create notes collection
    await db.createCollection('notes', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title', 'content', 'createdAt', 'userId'],
          properties: {
            title: {
              bsonType: 'string',
              description: 'Title of the note',
            },
            content: {
              bsonType: 'string',
              description: 'Content of the note',
            },
            tags: {
              bsonType: 'array',
              description: 'Tags for the note',
              items: {
                bsonType: 'string'
              }
            },
            fileId: {
              bsonType: ['objectId', 'null'],
              description: 'ID of associated file (optional)',
            },
            createdAt: {
              bsonType: 'date',
              description: 'Creation date of the note',
            },
            updatedAt: {
              bsonType: 'date',
              description: 'Last update date of the note',
            },
            userId: {
              bsonType: 'string',
              description: 'ID of the user who created the note',
            },
          },
        },
      },
    });

    // Create notifications collection
    await db.createCollection('notifications', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userId', 'message', 'read', 'createdAt'],
          properties: {
            userId: {
              bsonType: 'objectId',
              description: 'User ID associated with the notification',
            },
            message: {
              bsonType: 'string',
              description: 'Notification message',
            },
            read: {
              bsonType: 'bool',
              description: 'Read status of the notification',
            },
            createdAt: {
              bsonType: 'date',
              description: 'Creation date of the notification',
            },
            userId: {
              bsonType: 'string',
              description: 'ID of the user who created the note',
            },
          },
        },
      },
    });

    console.log('Collections created successfully');
  } catch (err) {
    console.error('Error creating collections:', err);
    throw err;
  }
}

async function main() {
  // Get MongoDB URI from environment variables or use a default for local development
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes_app';

  // Log which connection we're using (without exposing credentials)
  const isDefaultUri = !process.env.MONGODB_URI;
  console.log(`Using ${isDefaultUri ? 'default local' : 'environment variable'} MongoDB connection`);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    await createCollections(db);

    // Create indexes for better query performance
    const notesCollection = db.collection('notes');
    await notesCollection.createIndex({ title: 1 });
    await notesCollection.createIndex({ createdAt: -1 });
    await notesCollection.createIndex({ tags: 1 });

    const notificationsCollection = db.collection('notifications');
    await notificationsCollection.createIndex({ userId: 1 });
    await notificationsCollection.createIndex({ read: 1 });
    await notificationsCollection.createIndex({ createdAt: -1 });

    console.log('Indexes created successfully');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run with error handling
main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});