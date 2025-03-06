import { getBadgeVariant, getColor, getInitials, getHealthBadgeVariant } from '@/constants/globalFunctions';

describe('getBadgeVariant', () => {
    it('should return correct class for Critical severity', () => {
        expect(getBadgeVariant('Critical')).toBe('text-[#B91C1C] bg-[#FEF2F2] hover:bg-[#FEF2F2] font-normal');
    });

    it('should return correct class for High severity', () => {
        expect(getBadgeVariant('High')).toBe('text-[#B45309] bg-[#FDEBDD] hover:bg-[#FDEBDD] font-normal');
    });

    it('should return correct class for Medium severity', () => {
        expect(getBadgeVariant('Medium')).toBe('text-[#0284C7] bg-[#DDF3FD] hover:bg-[#DDF3FD] font-normal');
    });

    it('should return correct class for Low severity', () => {
        expect(getBadgeVariant('Low')).toBe('text-[#166534] bg-[#DCFCE7] hover:bg-[#DCFCE7] font-normal');
    });

    it('should return default class for unknown severity', () => {
        expect(getBadgeVariant('Unknown')).toBe('text-[#0F172A] bg-[#F1F5F9] hover:bg-[#F1F5F9] font-normal');
    });
});

describe('getColor', () => {
    it('should return correct class for Attack Vector', () => {
        expect(getColor('Attack Vector', 'Network')).toBe('text-red-600');
        expect(getColor('Attack Vector', 'Adjacent Network')).toBe('text-[#B45309]');
        expect(getColor('Attack Vector', 'Local')).toBe('text-[#0284C7]');
        expect(getColor('Attack Vector', 'Physical')).toBe('text-[#166534]');
        expect(getColor('Attack Vector', 'Unknown')).toBe('');
    });

    it('should return correct class for Attack Complexity', () => {
        expect(getColor('Attack Complexity', 'Low')).toBe('text-red-600');
        expect(getColor('Attack Complexity', 'Medium')).toBe('text-[#B45309]');
        expect(getColor('Attack Complexity', 'High')).toBe('text-[#166534]');
        expect(getColor('Attack Complexity', 'Unknown')).toBe('');
    });

    it('should return correct class for Privileges Required', () => {
        expect(getColor('Privileges Required', 'None')).toBe('text-red-600');
        expect(getColor('Privileges Required', 'Low')).toBe('text-[#B45309]');
        expect(getColor('Privileges Required', 'Medium')).toBe('text-[#0284C7]');
        expect(getColor('Privileges Required', 'Unknown')).toBe('');
    });

    it('should return correct class for User Interaction', () => {
        expect(getColor('User Interaction', 'None')).toBe('text-red-600');
        expect(getColor('User Interaction', 'Required')).toBe('text-[#166534]');
        expect(getColor('User Interaction', 'Unknown')).toBe('');
    });

    it('should return correct class for Scope', () => {
        expect(getColor('Scope', 'Changed')).toBe('text-red-600');
        expect(getColor('Scope', 'Unchanged')).toBe('text-[#166534]');
        expect(getColor('Scope', 'Unknown')).toBe('');
    });

    it('should return correct class for Confidentiality, Integrity, and Availability', () => {
        expect(getColor('Confidentiality', 'High')).toBe('text-red-600');
        expect(getColor('Confidentiality', 'Partial')).toBe('text-[#B45309]');
        expect(getColor('Confidentiality', 'Low')).toBe('text-[#0284C7]');
        expect(getColor('Confidentiality', 'None')).toBe('text-[#166534]');
        expect(getColor('Confidentiality', 'Unknown')).toBe('');

        expect(getColor('Integrity', 'High')).toBe('text-red-600');
        expect(getColor('Integrity', 'Partial')).toBe('text-[#B45309]');
        expect(getColor('Integrity', 'Low')).toBe('text-[#0284C7]');
        expect(getColor('Integrity', 'None')).toBe('text-[#166534]');
        expect(getColor('Integrity', 'Unknown')).toBe('');

        expect(getColor('Availability', 'High')).toBe('text-red-600');
        expect(getColor('Availability', 'Partial')).toBe('text-[#B45309]');
        expect(getColor('Availability', 'Low')).toBe('text-[#0284C7]');
        expect(getColor('Availability', 'None')).toBe('text-[#166534]');
        expect(getColor('Availability', 'Unknown')).toBe('');
    });

    it('should return correct class for Authentication', () => {
        expect(getColor('Authentication', 'None')).toBe('text-red-600');
        expect(getColor('Authentication', 'Partial')).toBe('text-[#B45309]');
        expect(getColor('Authentication', 'Low')).toBe('text-[#0284C7]');
        expect(getColor('Authentication', 'High')).toBe('text-[#166534]');
        expect(getColor('Authentication', 'Unknown')).toBe('');
    });
});

describe('getInitials', () => {
    it('should return initials for a single name', () => {
        expect(getInitials('John')).toBe('J');
    });

    it('should return initials for a full name', () => {
        expect(getInitials('John Doe')).toBe('JD');
    });

    it('should return initials for a name with multiple parts', () => {
        expect(getInitials('John Michael Doe')).toBe('JM');
    });

    it('should return "NA" for an empty name', () => {
        expect(getInitials('')).toBe('NA');
    });
});

describe('getHealthBadgeVariant', () => {

    it('should return correct class for value between 0 and 30', () => {
        expect(getHealthBadgeVariant(10)).toBe('text-[#FFFFFF] bg-[#B91C1C] hover:bg-[#B91C1C] font-normal');
    });

    it('should return correct class for value between 31 and 70', () => {
        expect(getHealthBadgeVariant(50)).toBe('text-[#FFFFFF] bg-[#B45309] hover:bg-[#B45309] font-normal');
    });

    it('should return correct class for value above 70', () => {
        expect(getHealthBadgeVariant(80)).toBe('text-[#FFFFFF] bg-[#15803D] hover:bg-[#15803D] font-normal');
    });
});