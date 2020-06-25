/** dot env library */
const dotenv = require('dotenv');
dotenv.config();
/**
 * Dream factory master setup
 *
 * @export
 * @class DreamFactory
 */
export class DreamFactory {
    /**
     * Host dream factory - using table
     *
     * @static
     * @memberof DreamFactory
     */
    static df_host = process.env.DF_HOST || 'http://api.zen.com.my/api/v2/zcs_dev/_table/';
    /**
     * Key dream factory
     *
     * @static
     * @memberof DreamFactory
     */
    static df_key = process.env.DF_KEY || 'cb82c1df0ba653578081b3b58179158594b3b8f29c4ee1050fda1b7bd91c3881';
    /**
     * Host dream factory - using stored procedure
     *
     * @static
     * @memberof DreamFactory
     */
    static df_host_proc = process.env.DF_HOST_PROC || 'http://api.zen.com.my/api/v2/zcs_dev/_proc/';
}