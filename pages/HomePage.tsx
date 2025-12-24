
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Group } from '../types';
import Navbar from '../components/Navbar';
import GroupCard from '../components/GroupCard';
import NewGroupModal from '../components/NewGroupModal';

const HomePage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;

    const userGroupsRef = collection(db, 'users', auth.currentUser.uid, 'groups');
    const q = query(userGroupsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const groupsData: Group[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Group[];
      
      setGroups(groupsData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Events</h1>
            <p className="text-gray-500 mt-1">Manage and view all your photo collections.</p>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading your groups...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* New Group Action Card */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative flex flex-col items-center justify-center p-8 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer h-full min-h-[220px]"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-800">New Group</span>
              <p className="text-sm text-gray-500 mt-2 text-center">Create a space for your next event's photos</p>
            </button>

            {/* List of Existing Groups */}
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}

        {!loading && groups.length === 0 && (
          <div className="mt-12 p-12 bg-gray-50 rounded-2xl text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">No photo groups yet</h2>
            <p className="text-gray-500 mt-2">Get started by creating your first photo event above.</p>
          </div>
        )}
      </main>

      <NewGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <footer className="py-8 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          &copy; 2024 KwickPic Clone. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
