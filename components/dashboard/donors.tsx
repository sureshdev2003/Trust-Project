"use client";

import { useState, useEffect } from "react";
import { Heart, Eye, Check, X, Trash2, Mail, CreditCard, Calendar, IndianRupee, Filter } from "lucide-react";
import Image from "next/image";

interface Donation {
  id: number;
  fullName: string;
  email: string;
  amount: string;
  panCard: string;
  transactionId: string;
  proofImageUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
}

export default function DonorsSection() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  // Fetch donations
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/donations');
      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }
      const data = await response.json();
      setDonations(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching donations:', err);
      setError('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const updateDonationStatus = async (id: number, status: 'verified' | 'rejected') => {
    try {
      setIsUpdating(id);
      const response = await fetch(`/api/donations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update donation status');
      }

      // Update local state
      setDonations(prev => 
        prev.map(donation => 
          donation.id === id ? { ...donation, status } : donation
        )
      );

      setSelectedDonation(null);
    } catch (err) {
      console.error('Error updating donation:', err);
      setError('Failed to update donation status');
    } finally {
      setIsUpdating(null);
    }
  };

  const deleteDonation = async (id: number) => {
    if (!confirm('Are you sure you want to delete this donation? This action cannot be undone.')) {
      return;
    }

    try {
      setIsUpdating(id);
      const response = await fetch(`/api/donations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete donation');
      }

      // Remove from local state
      setDonations(prev => prev.filter(donation => donation.id !== id));
      setSelectedDonation(null);
    } catch (err) {
      console.error('Error deleting donation:', err);
      setError('Failed to delete donation');
    } finally {
      setIsUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <Check className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const filteredDonations = donations.filter(donation => 
    statusFilter === 'all' || donation.status === statusFilter
  );

  const totalAmount = donations
    .filter(d => d.status === 'verified')
    .reduce((sum, d) => sum + parseFloat(d.amount), 0);

  const pendingCount = donations.filter(d => d.status === 'pending').length;
  const verifiedCount = donations.filter(d => d.status === 'verified').length;
  const rejectedCount = donations.filter(d => d.status === 'rejected').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <span className="ml-3 text-gray-600">Loading donations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Heart className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Donations Management</h1>
            <p className="text-gray-600">Manage and verify donation submissions</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <IndianRupee className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Verified</p>
              <p className="text-xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Verified</p>
              <p className="text-xl font-bold text-gray-900">{verifiedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-xl font-bold text-gray-900">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="all">All Donations</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Donations Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredDonations.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No donations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image Proof
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{donation.fullName}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {donation.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <CreditCard className="w-3 h-3" />
                          {donation.panCard}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">₹{parseFloat(donation.amount).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{donation.transactionId}</div>
                    </td>
<td className="px-6 py-4 whitespace-nowrap">
  {donation.proofImageUrl ? (
    <button
      onClick={() => window.open(donation.proofImageUrl, '_blank')}
      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      View Image
    </button>
  ) : (
    <span className="text-sm text-gray-500">No image</span>
  )}
</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(donation.status)}`}>
                        {getStatusIcon(donation.status)}
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDonation(donation)}
                          className="text-orange-600 hover:text-orange-900 p-1 rounded"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {donation.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateDonationStatus(donation.id, 'verified')}
                              disabled={isUpdating === donation.id}
                              className="text-green-600 hover:text-green-900 p-1 rounded disabled:opacity-50"
                              title="Verify Donation"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateDonationStatus(donation.id, 'rejected')}
                              disabled={isUpdating === donation.id}
                              className="text-red-600 hover:text-red-900 p-1 rounded disabled:opacity-50"
                              title="Reject Donation"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => deleteDonation(donation.id)}
                          disabled={isUpdating === donation.id}
                          className="text-red-600 hover:text-red-900 p-1 rounded disabled:opacity-50"
                          title="Delete Donation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Donation Details</h3>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDonation.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDonation.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="mt-1 text-sm font-semibold text-gray-900">₹{parseFloat(selectedDonation.amount).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PAN Card</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDonation.panCard}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDonation.transactionId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedDonation.status)}`}>
                      {getStatusIcon(selectedDonation.status)}
                      {selectedDonation.status.charAt(0).toUpperCase() + selectedDonation.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Proof</label>
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                    <Image
                      src={selectedDonation.proofImageUrl}
                      alt="Transaction Proof"
                      fill
                      className="object-contain"
                      unoptimized={selectedDonation.proofImageUrl.startsWith('/uploads/')}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-image.svg';
                      }}
                    />
                  </div>
                </div>

                {selectedDonation.status === 'pending' && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => updateDonationStatus(selectedDonation.id, 'verified')}
                      disabled={isUpdating === selectedDonation.id}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Verify Donation
                    </button>
                    <button
                      onClick={() => updateDonationStatus(selectedDonation.id, 'rejected')}
                      disabled={isUpdating === selectedDonation.id}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Reject Donation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}