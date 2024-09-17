
class Standardization {
    static trim(str: string): string {
        return str?.trim()?.toLowerCase();
    }
    static phone(str: string): string {
        return str?.replace(/[^0-9]/g, '')?.replace(/\s/g, '')?.slice(-10)?.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    }
    static capitalizeFirst(str: string): string {
        str = str?.trim()?.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export default Standardization